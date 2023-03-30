
const { createApp } = Vue //desestructuring

const app = createApp({
    data() {
        return {
            url_api:'https://mindhub-xj03.onrender.com/api/amazing',
            events:[],
            backup_events:[],
            unic_categories:[],
            selected_categories:[], 
            text:'',
            past_events:[],
            backup_past_events:[],
            current_date:new Date(),
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
                    this.current_date= datos.currentDate
                    this.obtener_categorias(datos.events)
                    this.filter_past_events(datos.currentDate,datos.events)
                    this.backup_past_events = this.filter_past_events(datos.currentDate,datos.events)
                })
        },
        obtener_categorias(array){
            array.forEach(el =>{
                if(!this.unic_categories.includes(el.category)){
                    this.unic_categories.push(el.category)
                }
            })
        },
        filter_past_events(date,array){
            return this.past_events= array.filter(el =>date>el.date)
        }
    },
    computed: {
        doble_filtro(){
            let filtro1= this.backup_events.filter(evento=>evento.name.toLowerCase().includes(this.text.toLowerCase()));
            if (!this.selected_categories.length){
                this.events = filtro1  
            }else{
                this.events= filtro1.filter(evento=>this.selected_categories.includes(evento.category))
            }
        },

        doble_filtro2(){
            let filtro2= this.backup_past_events.filter(evento=>evento.name.toLowerCase().includes(this.text.toLowerCase()));
            if (!this.selected_categories.length){
                this.past_events = filtro2  
            }else{
                this.past_events= filtro2.filter(evento=>this.selected_categories.includes(evento.category))
            }
        }
        
    },
    
    

}).mount('#app');


