"use client";
import { ColumnTanstackTable } from "@/utils/interfaces/tanstack.interface";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { useScooters } from "./hook";

const Scooters = () => {
  const { scooters } = useScooters();

  const columns: ColumnTanstackTable[] = [
    {
      header: "Modèle",
      accessorKey: "model",
    },
    {
      header: "Invervalle/mois",
      accessorKey: "maintenanceGapMonth",
    },
    {
      header: "Invervalle/jours",
      accessorKey: "maintenanceUsageDay",
    },
    {
      header: "Dispobilité",
      accessorKey: "isAvailable",
    },
  ];

  return (
    <Layout>
      <h1>Scooters</h1>

      <Table data={scooters} columns={columns} />
    </Layout>
  );
};

export default Scooters;
