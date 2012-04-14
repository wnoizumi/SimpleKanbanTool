using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimpleKanbanTool.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
        public Priority Priority { get; set; }
        public DateTime DueDate { get; set; }
    }
}