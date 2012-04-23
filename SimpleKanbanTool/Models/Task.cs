using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimpleKanbanTool.Models
{
    public class Task
    {
        public Task()
        {
            Status = global::Status.ToDo;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
    }
}