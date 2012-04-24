using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimpleKanbanTool.Models
{
    [Serializable]
    public class PrevalenceTaskDao : System.MarshalByRefObject, ITaskRepository
    {
        private int nextId = 0;
        private readonly Dictionary<int, Task> tasks = new Dictionary<int, Task>();

        public IEnumerable<Task> Get()
        {
            return tasks.Values.OrderBy(t=> t.Id);
        }

        public Task Add(Task task)
        {
            lock (this)
            {
                task.Id = nextId++;
                tasks.Add(task.Id, task);
                return task;
            }
        }

        public Task Get(int id)
        {
            if (tasks.ContainsKey(id))
                return tasks[id];
            return null;
        }

        public bool Delete(int id)
        {
            return tasks.Remove(id);
        }
    }
}