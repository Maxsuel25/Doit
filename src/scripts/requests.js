import { toast } from "./toast.js";

const baseUrl = "http://localhost:3333";
export const green = "#168821";
export const red = "#df1545";

export const loginRequest = async (requestBody) => {
  const token = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).then(async (res) => {
    const resConverted = await res.json();

    if (res.ok) {
      toast("Login realizado com sucesso!", green);
      localStorage.setItem("@doIt:token", resConverted.token);
      localStorage.setItem("@doIt:name", resConverted.name);

      setTimeout(() => {
        location.replace("./src/pages/dashboard.html");
      }, 1000);

      return resConverted;
    } else {
      toast(resConverted.message, red);
    }
  });

  return token;
};

export const createTask = async (requestBody) => {
  const token = localStorage.getItem("@doIt:token");

  const task = await fetch(`${baseUrl}/tasks/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  }).then(async (res) => {
    const resConverted = await res.json();

    if (res.ok) {
      toast("Tarefa criada com suceso!", green);
    } else {
      toast(resConverted.message, red);
    }
  });

  return task;
};

export const readAllTasks = async () => {
  const token = localStorage.getItem("@doIt:token");

  const tasks = await fetch(`${baseUrl}/tasks/readAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    const resConverted = res.json();

    if (res.ok) {
      return resConverted;
    } else {
      toast(resConverted.message, red);
    }
  });

  return tasks;
};

export const readTaskById = async (taskId) => {
  const token = localStorage.getItem("@doIt:token");

  const task = await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    const resConverted = await res.json();

    if (res.ok) {
      return resConverted;
    } else {
      toast(resConverted.message, red);
    }
  });
  return task;
};

export const updateTaskById = async (taskId, requestBody) => {
  const token = localStorage.getItem("@doIt:token");

  const task = await fetch(`${baseUrl}/tasks/update/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  }).then(async (res) => {
    const resConverted = await res.json();

    if (res.ok) {
      toast("Tarefa atualizada com sucesso!", green);
      return resConverted;
    } else {
      toast(resConverted.message, red);
    }
  });
  return task;
};

export const deleteTaskById = async (taskId) => {
  const token = localStorage.getItem("@doIt:token");

  const task = await fetch(`${baseUrl}/tasks/delete/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    const resConverted = await res.json();

    if (res.ok) {
      toast(resConverted.message, green);
    } else {
      toast(resConverted.message, red);
    }
  });
  return task;
};

export async function completeTask(taskId) {
  const token = localStorage.getItem("@doIt:token");
  const task = await fetch(`${baseUrl}/tasks/complete/${taskId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    const resJson = res.json();

    if (res.ok) {
      toast("Tarefa concluída com sucesso", green);

      return resJson;
    } else {
      toast(resJson.message, red);

      return false;
    }
  });

  return task;
}

export async function uncompleteTask(taskId) {
  const token = localStorage.getItem("@doIt:token");
  const task = await fetch(`${baseUrl}/tasks/uncomplete/${taskId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    const resJson = res.json();

    if (res.ok) {
      toast("Tarefa retornada para pendente", green);

      return resJson;
    } else {
      toast(resJson.message, red);

      return false;
    }
  });

  return task;
}
