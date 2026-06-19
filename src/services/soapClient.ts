const SOAP_URL = 'http://localhost:51842/InventarioService.svc';
const SOAP_NS = 'http://tempuri.org/';

export async function callSoap(operation: string, params: Record<string, string> = {}): Promise<string> {
  // 1. Construir los parámetros como XML
  const paramsXml = Object.entries(params)
    .map(([key, value]) => `<tem:${key}>${value}</tem:${key}>`)
    .join('');

  // 2. Armar el envelope SOAP completo
  const body = `
      <soapenv:Envelope
        xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:tem="${SOAP_NS}">
        <soapenv:Header/>
        <soapenv:Body>
          <tem:${operation}>
            ${paramsXml}
          </tem:${operation}>
        </soapenv:Body>
        </soapenv:Envelope>
    `;

  // 3. Hacer el llamado al servicio web
  const response = await fetch(SOAP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
      SOAPAction: `"${SOAP_NS}${operation}"`,
    },
    body,
  });

  // 4. Leer la respuesta como texto XML
  const xml = await response.text();

  // 5. Extraer el contenido de la etiqueta Result
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const result = Array.from(doc.querySelectorAll('*')).find(el => el.localName.endsWith('Result'));
  return result?.textContent ?? '';
}
