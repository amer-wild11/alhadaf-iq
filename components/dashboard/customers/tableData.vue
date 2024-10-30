<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Customer {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const props = defineProps<{
  customers: Customer[];
}>();
</script>

<template>
  <Table>
    <TableCaption>A list of your customers.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead> Name </TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead> Message </TableHead>
        <TableHead> Action </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(customer, i) in props.customers" :key="i">
        <TableCell class="font-medium">{{ customer.name }}</TableCell>
        <TableCell>{{ customer.email }}</TableCell>
        <TableCell>{{ customer.phone }}</TableCell>
        <TableCell>{{ customer.message }}</TableCell>
        <TableCell
          ><span class="action">
            <DashboardCustomersDeleteAction :customer="customer" /> </span
        ></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style scoped lang="scss">
.action {
  background-color: rgb(201, 41, 41);
  border-radius: 4px;
  color: white;
  font-weight: 600;
  padding: 5px;
  cursor: pointer;
  user-select: none;
  font-size: 20px;
}
</style>
