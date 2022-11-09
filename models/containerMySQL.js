

class ContainerMySQL{
    constructor(knex, nombreTabla){
        this.knex = knex;
        this.nombreTabla = nombreTabla
    }

    async getAll(){
        try {
            const response = await this.knex.select("*").from(this.nombreTabla);
            return response;  
        } catch (error) {
            return error
        }
    }

    async save(){
        try {
            const response = await this.knex.insert(element).into(this.table);
            return response;
        } catch (error) {
            return error
        }
    }
}

export {ContainerMySQL}