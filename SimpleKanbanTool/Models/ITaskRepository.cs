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

        bool TryGet(int id, out Task task);

        bool Delete(int id);
    }
}
