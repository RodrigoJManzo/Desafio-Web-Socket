const products = [
    {
      titulo: "prueba",
      precio: "123",
      imagen:
        "https://i.blogs.es/6ea5c0/grafica/1366_2000.jpg",
    },
    {
      titulo: "prueba 2",
      precio: "456",
      imagen:
        "https://www.shutterstock.com/image-photo/large-powerful-graphics-card-three-600w-1977335933.jpg",
    },
    {
      titulo: "Prueba 3",
      precio: "789",
      imagen:
        "https://www.notebookcheck.org/fileadmin/_processed_/csm_Boardshot_GeForce_Go_7900_GTX_3qtr_04_01c24b76ef.jpg",
    },
  ];
  
  const messages = [
    { 
      author: {
          id: 'mail del usuario1', 
          nombre: 'nombre del usuario1', 
          apellido: 'apellido del usuario1', 
          edad: 'edad del usuario1', 
          alias: 'alias del usuario1',
          avatar: 'url avatar (foto, logo) del usuario1'
      },
      text: 'mensaje 1'
  },
  { 
    author: {
        id: 'mail del usuario2', 
        nombre: 'nombre del usuario2', 
        apellido: 'apellido del usuario2', 
        edad: 'edad del usuario2', 
        alias: 'alias del usuario2',
        avatar: 'url avatar (foto, logo) del usuario2'
    },
    text: 'mensaje 2'
},
{ 
  author: {
      id: 'mail del usuario3', 
      nombre: 'nombre del usuario3', 
      apellido: 'apellido del usuario3', 
      edad: 'edad del usuario3', 
      alias: 'alias del usuario3',
      avatar: 'url avatar (foto, logo) del usuario3'
  },
  text: 'mensaje 3'
}
  
    
  ];
  
  export const DATASETS = { products, messages };