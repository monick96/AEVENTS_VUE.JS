
const { createApp } = Vue //desestructuring

const app = createApp({
    data() {
        return {
            url_api:'https://mindhub-xj03.onrender.com/api/amazing',
            events:[],
            backup_events:[],
            unic_categories:[],
            selected_categories:[],   
            
        }
    },
    created(){
        this.obtener_datos()
    },
    mounted() {
        
    },
    methods: {
        obtener_datos(){
            fetch(this.url_api)
                .then(resp => resp.json())
                .then(datos =>{
                    this.events = datos.events
                    this.backup_events= this.events
                    this.obtener_categorias(datos.events)
                    //falta agrear aca this.extraercategorias
                })
        },
        obtener_categorias(array){
            array.forEach(el =>{
                if(!this.unic_categories.includes(el.category)){
                    this.unic_categories.push(el.category)
                }
            })
        }
    },
    computed: {

    },
    

}).mount('#app');


