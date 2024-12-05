<template>
    <el-card style="max-width: 100%">
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form
                ref="referenceForm"
                :model="dataForm"
                :rules="rules"
                class="demo-ruleForm"
                :size="formZize"
                status-icon
                style="width: 90%;"
                label-width="auto"
                >
                <el-form-item label="Nombres del usuario" prop="name">
                    <el-input v-model="dataForm.name" placeholder="Primer y segundo nombre"/>
                </el-form-item>
                <el-form-item label="Apellidos del usuario" prop="last_name">
                    <el-input v-model="dataForm.last_name" placeholder="Primer y segundo apellido"/>
                </el-form-item>
                <el-form-item label="Ingrese foto del usuario" prop="image">
                    <el-input v-model="dataForm.image"/>
                </el-form-item>
                <el-form-item label="Ingrese numero de identificación" prop="cedula">
                    <el-input v-model="dataForm.cedula" placeholder="El formato ej: 1079408646"/>
                </el-form-item>
                <el-form-item label="Genero" prop="gender">
                    <el-select v-model="dataForm.gender" placeholder="Selecciona un genero">
                        <el-option label="Hombre" value="male"/>
                        <el-option label="Mujer" value="female"/>
                        <el-option label="Otro" value="other"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="Ingrese contraseña" prop="password">
                    <el-input placeholder="Crea una contraseña para el usuario" type="password" show-password  v-model="dataForm.password"/>
                </el-form-item>
                <el-form-item label="Fecha de nacimiento" prop="birthdate">
                <el-date-picker
                type="date" 
                v-model="dataForm.birthdate"
                aria-label="Escoge una fecha"
                placeholder="Escoge una fecha"
                style="width: 100%;"
                />
                </el-form-item>
                <el-form-item label="Fecha de registro" prop="registration_date">
                <el-date-picker
                v-model="dataForm.registration_date"
                type="date"
                aria-label="Escoge una fecha"
                placeholder="Escoge la fecha en que se registrara el usuario"
                style="width: 100%;"
                />
                </el-form-item>
                <el-form-item label="Estado de la cuenta" prop="account_status">
                    <el-select v-model="dataForm.account_status" placeholder="Seleccione un estado (inicialmente debe estar activo)">
                        <el-option v-for="item in option"
                        :key="item.id"
                        :label="item.name"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Ingrese Email" prop="email">
                    <el-input v-model="dataForm.email"/>
                </el-form-item>
                <el-form-item label="Ingrese id" prop="user_id">
                    <el-input placeholder="Ingrese un id ej: 00001 y si ya exite 00002, asi sucesivamente" v-model="dataForm.user_id"/>
                </el-form-item>
                <el-form-item label="Selecciona un rol" prop="rol_id">
                    <el-select v-model="dataForm.rol_id" placeholder="Rol para el usuario">
                        <el-option v-for="item in props.rol" 
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Selecciona el tipo de telefono" prop="typePhone">
                    <el-select v-model="dataForm.typePhone" placeholder="Especifique el tipo de telefono">
                        <el-option label="Personal" value="personal" />
                        <el-option label="Empresarial" value="empresarial" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Ingrese numero telefonico" prop="numberPhone">
                    <el-input v-model="dataForm.numberPhone" placeholder="Numero telefonico de la persona"/>
                </el-form-item>
                <el-form-item label="Selecciona la ciudad" prop="city_id">
                    <el-select v-model="dataForm.city_id" placeholder="Seleccione la ciudad perteneciente al usuario">
                        <el-option v-for="item in props.city"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Ingrese nombre del barrio" prop="neighborhoodName">
                    <el-input v-model="dataForm.neighborhoodName" placeholder="Nombre del barrio"/>
                </el-form-item>
                <el-form-item label="Ingrese direccion" prop="address">
                    <el-input v-model="dataForm.address" placeholder="Direccion de la residencia"/>
                </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>
  
<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({
    city: {
        type: Array,
        required: true,
    },
    rol:{
        type: Array,
        required: true
    },
    dataValue: Object
})
const formZize = ref('default')
const referenceForm = ref()
const dataForm = reactive({
    name: '', 
    last_name: '',
    image: '',
    cedula: '',
    birthdate:'',
    password: '',
    gender: '',
    registration_date: '',
    account_status: '',
    email: '',
    user_id: '',
    rol_id: '',
    typePhone: '',
    numberPhone:'',
    neighborhoodName: '',
    address:'',
    city_id:''
})

const option =[
    {id:1 ,name: "Activo", value: true},
    {id:2 ,name: "Inactivo", value: false}
]

const rules =reactive({
    name:[
        {required: true, message: 'Ingrese el nombre del usuario ', trigger: 'blur'},
        {
        validator:(value, rule , callback)=>{
            if(isNaN(dataForm.name)){
                callback()
            }else{
                callback(new Error('Los nombre no deben contener numero o caracteres especiales'))

            }
        },
    }
    ],
    last_name:[
    {required: true, message: 'Ingrese apellidos', trigger: 'blur'},
    {
        validator:(value, rule , callback)=>{
            if(isNaN(dataForm.last_name)){
                callback()
            }else{
                callback(new Error('Los apellidos no deben contener numero o caracteres especiales'))

            }
        },
    },
    ],
    image: [
        {required:true, message: 'Ingrese imagen', trigger: 'blur'}
    ],
    cedula: [
        {required:true, message: 'Ingrese numero de identificación', trigger: 'blur'},
        {
            validator:(value, rules, callback)=>{
                if(isNaN(dataForm.cedula)){
                    callback(new Error('Solo debe contener numeros'))
                }else{
                    callback()
                }
            }
        }
    ],
    password: [
        {required: true, message: 'Ingrese una contreseña', trigger: 'blur'},
        {min: 11, max :20, message: 'Ingrese una contraseña minima de 11 caracteres', trigger: 'blur'}
    ],
    birthdate:[
        {required: true, message: 'Ingrese una fecha', trigger: 'blur'}
    ],
    registration_date: [
        {required: true, message: 'Ingrese una fecha', trigger: 'blur'}
    ],
    statusAccount: [
        {required: true, message: 'Ingrese una fecha', trigger: 'cahnge'}
    ],
    email: [
        {type: 'email', message: 'Ingrese un correo valido', trigger: 'blur'},
        {required: true, message: 'Ingrese un correo', trigger: 'blur' }
    ],
    user_id:[
        {min: 5, max: 5, message: 'El id debe tener 5 caracteres numericos', trigger: 'blur'},
        {required: true, message: 'Ingrese un id', trigger: 'blur'},
        {
            validator:(value, rules, callback)=>{

                if(isNaN(dataForm.user_id)){
                    callback(new Error ('El id solo permite numeros'))
                }else{
                    callback()
                }
            }
        }
    ],
    rol_id: [
        {required: true, message: 'Seleccione un rol', trigger: 'blur'}
    ],
    typePhone:[
        {required: true, message: 'Seleccione el tipo de telefono', trigger: 'blur'}
    ],
    numberPhone:[
        {required: true, message: 'Ingresa un numero telefonico', trigger: 'blur'},
        {
            validator: (value, rule, callback)=>{ 

                if(isNaN(dataForm.numberPhone)){
                    callback(new Error('El numero de telefono solo contiene caracteres numericos'))
                }else{
                    callback()
                }
        }
        }
    ],
    neighborhoodName:[
        {required: true, message: 'Ingrese nombre del barrio', trigger: 'blur'}
    ],
    address:[
        {required: true, message: 'Ingrese nombre del barrio', trigger: 'blur'}
    ],
    gender:[
        {required: true, message: 'Especifica un genero', trigger: 'blur'}
    ],
    city_id:[
        {required: true, message: 'Selecciona la ciudad', trigger: 'blur'}
    ]
}) 

const runRules = async (reference) =>{
    if(!reference) return false
    return new Promise ((resolve)=>{
        reference.validate((valid)=>{
            if(valid){
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}

const clearFields= async ()=>{
    referenceForm.value.reseFields()
}

defineExpose({clearFields, runRules, dataForm, referenceForm})

</script>
<style scoped>

.el-form-item{
margin-bottom: 30px;
transform: translate(50px);
}
</style>