import {toast} from "sonner";
import {BASE_URL, BASE_PORT} from "@/bin/utils";


export class RequestsModel{
  private url: string;
  constructor() {
     this.url = `${BASE_URL}:${BASE_PORT}/api`;
  }

  async getAll(database: string) {
    try{
      const res = await fetch(`${this.url}/${database}`, {
        method: 'GET',
      })
      if (res.ok) {
        const data = await res.json();
        toast('Service created successfully.!', {
          description: 'Please say thank you to Sairommef',
        });
        return data; // <--- добавьте это
      }
      else {
        toast('Error with server!', {
          description: 'The data is not empty please check the connecting to server or LAN or server data, or hit Nafis on the back of the head',
        });
        return []; // <--- чтобы не было undefined
      }
    }catch(e: any){
      toast('Something went wrong!', {
        description: 'Logs was send on console',
      });
      return []; // <--- чтобы не было undefined
    }
  }

  async getAllByUser(database: string) {
    try{
      const token = localStorage.getItem("token");

      const res = await fetch(`${this.url}/${database}`, {
        method: 'GET',
        headers: {
        "Authorization": `Bearer ${token}`, // <--- токен в хедерах
        "Content-Type": "application/json"
      }
      })
      if (res.ok) {
        const data = await res.json();
        toast('Service created successfully.!', {
          description: 'Please say thank you to Sairommef',
        });
        return data; // <--- добавьте это
      }
      else {
        toast('Ошибка сервера или доступа!', {
          description: 'Возможно, токен протух',
        });
        return []; // <--- чтобы не было undefined
      }
    }catch(e: any){
      toast('Something went wrong!', {
        description: 'Logs was send on console',
      });
      return []; // <--- чтобы не было undefined
    }
  }

  async create(database: string, data: Record<string, any>) {
    try{
      const res = await fetch(`${this.url}/${database}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
      if (res.ok) {
        const data = await res.json();
        toast('Service created successfully.!', {
          description: 'Please say thank you to Sairommef',
        });
        return data; // <--- добавьте это
      }
      else {
        toast('Error with server!', {
          description: 'The data is not empty please check the connecting to server or LAN or server data, or hit Nafis on the back of the head',
        });
        return []; // <--- чтобы не было undefined
      }
    }catch(e: any){
      toast('Something went wrong!', {
        description: 'Logs was send on console',
      });
      return []; // <--- чтобы не было undefined
    }
  }

  async createByUser(database: string, data: Record<string, any>) {
    const token = localStorage.getItem("token");

    try{
      const res = await fetch(`${this.url}/${database}`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`, // <--- токен в хедерах
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
      if (res.ok) {
        const data = await res.json();
        toast('Успешно создана запись!', {
          description: 'Скажи спасибо Sairommef',
        });
        return data; // <--- добавьте это
      }
      else {
        toast('Error with server!', {
          description: 'The data is not empty please check the connecting to server or LAN or server data, or hit Nafis on the back of the head',
        });
        return []; // <--- чтобы не было undefined
      }
    }catch(e: any){
      toast('Something went wrong!', {
        description: 'Logs was send on console',
      });
      return []; // <--- чтобы не было undefined
    }
  }

  async login(database: string, data: Record<string, any>) {
    try{
      const res = await fetch(`${this.url}/${database}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
      if (res.ok) {
        const data = await res.json();
        toast('Service created successfully.!', {
          description: 'Please say thank you to Sairommef',
        });
        return data; // <--- добавьте это
      }
      else {
        toast('Error with server!', {
          description: 'The data is not empty please check the connecting to server or LAN or server data, or hit Nafis on the back of the head',
        });
        return []; // <--- чтобы не было undefined
      }
    }catch(e: any){
      toast('Something went wrong!', {
        description: 'Logs was send on console',
      });
      return []; // <--- чтобы не было undefined
    }
  }

  async updateByUser(database: string, data: Record<string, any>, id:string) {
    const token = localStorage.getItem("token");

    try{
      const res = await fetch(`${this.url}/${database}/${id}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`, // <--- токен в хедерах
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
      if (res.ok) {
        const data = await res.json();
        toast('Service created successfully.!', {
          description: 'Please say thank you to Sairommef',
        });
        return data; // <--- добавьте это
      }
      else {
        toast('Error with server!', {
          description: 'The data is not empty please check the connecting to server or LAN or server data, or hit Nafis on the back of the head',
        });
        return []; // <--- чтобы не было undefined
      }
    }catch(e: any){
      toast('Something went wrong!', {
        description: 'Logs was send on console',
      });
      return []; // <--- чтобы не было undefined
    }
  }

    async deleteByUser(database: string, id:string) {
    const token = localStorage.getItem("token");

    try{
      const res = await fetch(`${this.url}/${database}/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`, // <--- токен в хедерах
        "Content-Type": "application/json"
      },
    });
      if (res.ok) {
        const data = await res.json();
        toast('Delete successfully.!', {
          description: 'Please say thank you to Sairommef',
        });
        return data; // <--- добавьте это
      }
      else {
        toast('Error with server!', {
          description: 'The data is not empty please check the connecting to server or LAN or server data, or hit Nafis on the back of the head',
        });
        return []; // <--- чтобы не было undefined
      }
    }catch(e: any){
      toast('Something went wrong!', {
        description: 'Logs was send on console',
      });
      return []; // <--- чтобы не было undefined
    }
  }
}

