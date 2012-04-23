using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimpleKanbanTool.Models
{
    [Serializable]
    public class Task
    {
        public Task()
        {
            Status = global::Status.ToDo;
        }

        private int id;
        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        private string title;
        public string Title
        {
            get { return title; }
            set { title = value; }
        }

        private string description;
        public string Description
        {
            get { return description; }
            set { description = value; }
        }

        private Status status;

        public Status Status
        {
            get { return status; }
            set { status = value; }
        }

    }
}