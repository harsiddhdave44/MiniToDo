using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Data;
using ToDoAPI.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDoAPI.Controllers
{
    //[EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        #region Fields and variables
        public OrmLiteConnectionFactory connectionFactory = null;
        public IDbConnection connection;
        public IConfiguration Configuration { get; set; }
        #endregion


        #region Constructor
        public ToDoController(IConfiguration configuration)
        {
            Configuration = configuration;
            string conn = string.Empty;
            try
            {
                conn = configuration.GetSection("ConnectionStrings")["Default"];
                connectionFactory = new OrmLiteConnectionFactory(conn, MySqlDialect.Provider);
                connection = connectionFactory.Open();
            }
            catch (Exception ex)
            {
                //Logger.LogError(ex.Message, "Cannot fetch the connection string");
            }
        }
        #endregion

        #region Create Todo Item
        //Create Todo Item
        [HttpPost]
        [Route("add")]
        public Todo AddTodoItem([FromBody] Todo todo)
        {
            if (connection.State != System.Data.ConnectionState.Open)
            {
                connection = connectionFactory.Open();
            }
            long isCreated = connection.Insert<Todo>(todo);

            return todo;
        }
        #endregion

        #region Get all Todo Items
        //Get all Todo Items
        // GET: api/<ToDoController>
        [HttpGet]
        [Route("getAll")]
        public IEnumerable<Todo> GetTodoList()
        {
            if (connection.State != System.Data.ConnectionState.Open)
            {
                connection = connectionFactory.Open();
            }
            List<Todo> todoItems = connection.Select<Todo>();
            return todoItems;
        }
        #endregion

        #region Get Single Todo Item
        //Get single Todo Item
        [HttpGet("{id}")]
        [Route("get")]
        public Todo GetTodoItem([FromQuery] int id)
        {
            if (connection.State != System.Data.ConnectionState.Open)
            {
                connection = connectionFactory.Open();
            }
            Todo todoItem = connection.Select<Todo>(todo => todo.id == id)[0];
            return todoItem;
        }
        #endregion

        #region Update Todo Item
        //Update Todo item
        // POST api/<ToDoController>
        [HttpPost]
        [Route("update")]
        public Todo UpdateTodoItem([FromBody] Todo todo)
        {
            if (connection.State != System.Data.ConnectionState.Open)
            {
                connection = connectionFactory.Open();
            }
            int isUpdated = connection.Update<Todo>(todo);
            Todo todoItem = connection.Select<Todo>(todoItem => todoItem.id == todo.id)[0];
            return todoItem;
        }
        #endregion

        #region Delete Item
        //DeleteTodo Item
        // PUT api/<ToDoController>/5
        [HttpDelete("{id}")]
        [Route("delete")]
        public ActionResult<int> DeleteTodo([FromQuery] int id)
        {
            if (connection.State != System.Data.ConnectionState.Open)
            {
                connection = connectionFactory.Open();
            }
            int isDeleted = connection.Delete<Todo>(todo => todo.id == id);
            return isDeleted;
        }
        #endregion
    }
}
