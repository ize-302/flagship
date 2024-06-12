<script setup>
import { object, string } from "yup";

const isSubmitting = ref(false);
const router = useRouter();

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event) {
  // Do something with event.data
  console.log(event.data);
}

useHead({
  title: "Login to continue",
});

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div>
    <p class="text-gray-400 mb-5">Create a Flagship account</p>

    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput size="lg" v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput size="lg" v-model="state.password" type="password" />
      </UFormGroup>

      <UButton block size="lg" class="bg-main" type="submit">
        CREATE ACCOUNT
      </UButton>
    </UForm>

    <div class="flex justify-center gap-1 mt-4 text-gray-600 text-sm">
      Already have an account?
      <nuxt-link class="text-main" to="/login">Log in</nuxt-link>
    </div>
  </div>
</template>
