using ServiceStack.DataAnnotations;

namespace ToDoAPI.Model
{
    [Alias("todolist")]
    public class Todo
    {
        [Required]
        [AutoIncrement]
        public int id { get; set; }

        [System.ComponentModel.DataAnnotations.Required(AllowEmptyStrings = false, ErrorMessage = "Todo item is required")]
        public string todo { get; set; }

        //[System.ComponentModel.DataAnnotations.Required(AllowEmptyStrings = false, ErrorMessage = "Todo Item must have a status")]
        //public bool isCompleted { get; set; }
    }
}
