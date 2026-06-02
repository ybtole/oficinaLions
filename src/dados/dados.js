export function workshopData() {
    return {
        metodo: "POST",
      body: {
        name: "string",
        address: "string",
        telefone: "number (formato: +XXYYZZZZZZZZZ)"
      },
      exemplo: {
        name: "Oficina do Heitor",
        address: "Rua das Flores, 123",
        telefone: "5542999201450"
      }
    }
}