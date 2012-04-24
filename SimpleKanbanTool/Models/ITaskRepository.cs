using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SimpleKanbanTool.Models
{
    public interface ITaskRepository
    {
        IEnumerable<Task> Get();

        Task Add(Task task);

        Task Get(int id);

        bool Delete(int id);
    }
}
