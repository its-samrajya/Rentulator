interface EsewaConfig {
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: string;
  product_delivery_charge: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  esewaSignature: string;
}

export function submitToEsewa(amount: string, esewaConfig: EsewaConfig) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

  const esewaPayload = {
    amount: amount,
    tax_amount: esewaConfig.tax_amount,
    total_amount: esewaConfig.total_amount,
    transaction_uuid: esewaConfig.transaction_uuid,
    product_code: esewaConfig.product_code,
    product_service_charge: esewaConfig.product_service_charge,
    product_delivery_charge: esewaConfig.product_delivery_charge,
    success_url: esewaConfig.success_url,
    failure_url: esewaConfig.failure_url,
    signed_field_names: esewaConfig.signed_field_names,
    signature: esewaConfig.esewaSignature,
  };

  Object.entries(esewaPayload).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
