<template>
  <q-form @submit="Login"></q-form>
  <q-page class="flex flex-center">
    <q-card style="width: 100%; max-width: 400px;">

      <!-- Envolvemos las secciones del profe en un q-form para la funcionalidad -->
      <q-form @submit="handleLogin">

        <q-card-section class="row">
          <q-input
            v-model="email"
            type="email"
            label="Correo"
            class="full-width"
            lazy-rules
            :rules="[val => !!val || 'El correo es obligatorio']"
          />
        </q-card-section>

        <q-card-section class="row">
          <q-input
            v-model="password"
            type="password"
            label="Contraseña"
            class="full-width"
            lazy-rules
            :rules="[val => !!val || 'La contraseña es obligatoria']"
          />
        </q-card-section>

        <q-card-actions vertical align="center">
          <!-- Reemplazamos "Action 1" por el botón real con estado de carga -->
          <q-btn label="Iniciar Sesión" type="submit" color="primary" :loading="loading" />

          <!-- Dejamos "Action 2" como lo tiene el profe, probablemente lo use para "Registrarse" después -->
          <q-btn flat label="Action 2" />
        </q-card-actions>

      </q-form>

    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from '@/boot/supabase'

// Variables del formulario
const email = ref('')
const password = ref('')
const loading = ref(false)

async function Login() {
  const { error } = await supabase.auth.signInWithPassword({
  email: email.value,
  password: password.value,
})
  if (error) {
    console.error('Error al iniciar sesión:', error.message)
  } else {
    console.log('Inicio de sesión exitoso')
  }
}

// Herramientas de navegación y notificaciones
const router = useRouter()
const $q = useQuasar()

// Función que se ejecuta al darle clic a "Iniciar Sesión"
async function handleLogin() {
  loading.value = true

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (error) {
    $q.notify({
      type: 'negative',
      message: 'Error al iniciar sesión: Verifica tus datos.',
      position: 'top',
      icon: 'warning'
    })
    console.error(error)
  } else {
    $q.notify({
      type: 'positive',
      message: '¡Bienvenido!',
      position: 'top',
      icon: 'check_circle'
    })
    router.push('/eventos')
  }
}
</script>

<style scoped>
/* Opcional: puedes agregar estilos aquí si el profe lo hace más adelante */
</style>
