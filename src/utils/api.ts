// ============================================================
// FENIFISC API Client
// Conexion con el backend PHP/MySQL
// ============================================================

import type { FormularioData } from '../types/formulario';

const API_BASE = './api';

export interface ApiResponse {
  exito: boolean;
  mensaje?: string;
  error?: string;
  id?: number;
  accion?: string;
  atleta?: FormularioData;
  total?: number;
  atletas?: Array<{
    id: number;
    nombres: string;
    apellidos: string;
    documentoIdentidad: string;
    categoria: string;
    seleccion: string;
    creadoEn: string;
  }>;
}

async function fetchApi(endpoint: string, options: RequestInit = {}): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  const data = await response.json();
  return data as ApiResponse;
}

export async function guardarEnBaseDeDatos(data: FormularioData): Promise<ApiResponse> {
  return fetchApi('guardar.php', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function buscarAtletaPorDocumento(documento: string): Promise<ApiResponse> {
  return fetchApi(`obtener.php?documento=${encodeURIComponent(documento)}`);
}

export async function obtenerListaAtletas(): Promise<ApiResponse> {
  return fetchApi('obtener.php');
}

export async function eliminarAtleta(documento: string): Promise<ApiResponse> {
  return fetchApi('eliminar.php', {
    method: 'POST',
    body: JSON.stringify({ documento }),
  });
}
