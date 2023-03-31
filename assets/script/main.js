
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
            id:'',
            evento:{},
            
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
                    this.events = this.filter_events(datos.events,datos.currentDate)
                    this.backup_events= this.events
                    this.obtener_categorias(datos.events)
                    let params= new URLSearchParams(location.search)
                    this.id=params.get('id')
                    if(this.id !=''){
                        this.evento= this.events.find(el=>el._id==this.id)
                    }
                })
        },
        obtener_categorias(array){
            array.forEach(el =>{
                if(!this.unic_categories.includes(el.category)){
                    this.unic_categories.push(el.category)
                }
            })
        },
        filter_events(array_eventos,date){
            let page = document.getElementById('page').textContent
            if (page == 'Past Events'){
                return array_eventos.filter(el =>date>el.date )
            }else if(page =='Upcoming Events'){
                return array_eventos.filter(el =>date<el.date )
            }
            return array_eventos
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
        }
    },
    
    

}).mount('#app');


