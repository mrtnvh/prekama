<template>
  <VForm as="" v-slot="{ handleSubmit }" :validation-schema="validationSchema" @submit="$emit('submit')">
    <form @submit="handleSubmit($event, (values) => $emit('submit', values))" class="flex flex-col gap-6 items-start">
      <div
        v-for="{ as, name, label, type, value, children, ...attrs } in schema.fields"
        :key="name"
        class="w-full flex flex-col gap-1"
      >
        <label :for="name" class="form-label inline-block mb-1 text-gray-700">{{ label }}</label>
        <Field :name="name" v-slot="{ field, errors }" :model-value="value">
          <DynamicFormControl
            v-bind="{
              as,
              name,
              type,
              field,
              ...attrs,
              children,
              hasErrors: errors.length > 0,
            }"
          />
          <ErrorMessage :name="name" class="text-sm text-red-500 mt-1" />
        </Field>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="indigo" type="submit">Submit</Button>
        <slot name="cancel" />
      </div>
    </form>
  </VForm>
</template>

<script setup lang="ts">
import { Form as VForm, Field, ErrorMessage } from "vee-validate";
import { ZodType } from "zod";
import { toFormValidator } from "@vee-validate/zod";

interface IFieldSchema {
  as: string;
  name: string;
  label: string;
  type?: string;
  value?: string;
  children?: {
    tag: string;
    text: string;
    [key: string]: any;
  }[];
}

interface IFormSchema {
  rules: any;
  fields: IFieldSchema[];
}

const props = defineProps<{ schema: IFormSchema }>();
defineEmits(["submit"]);
const validationSchema = toFormValidator(props.schema.rules);
</script>
