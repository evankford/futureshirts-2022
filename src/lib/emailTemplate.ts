
const labelAttrs = ' align="left" style="background:#fafafa; font-weight:700; padding: 8px;"'
const valueAttrs = ' align="left" colspan="3" style="padding: 8px;"';

function commonBefore(formTitle:string = 'Contact Form') {
  return `
   <html>
    <body>
        <table style="padding: 20px 0">
          <tbody>
            <h1 style="font-size: 24px;">New ${formTitle} Message</h1>
            <p>You have a new message from the Futureshirts ${formTitle}. The details are below. You may reply to this message to respond to the submission directly.</p>
          </tbody>
        </table>

        <table style="padding: 8px; ">
        <thead>
          <tr>
            <th align="left"  style="padding: 8px;color:#8f8f8f"; font-weight:700" colspan="1">Field</th>
            <th align="left"  style="padding: 8px; color:#8f8f8f"; font-weight:700" colspan="3">Value</th>
          </tr>
        </thead>
        `;
}

const commonAfter =`
    </table padding="8">
    </body>
  </html>`;




function genOrderDetails(orderDate:string | undefined = undefined, orderNumber: string | undefined = undefined) {
  let str ="";
  if (orderNumber) {
   str += `<tr><td ${labelAttrs}>Order Number:</td><td ${valueAttrs}>${orderNumber}</td></tr>`
  }
  if (orderDate) {
   str += `<tr><td ${labelAttrs}>Order Date:</td><td ${valueAttrs}>${orderDate}</td></tr>`
  }
  return str;
}


export function contact(data:ContactData) {
  return `
   ${commonBefore()}
      <tr>
        <td ${labelAttrs}>Name:</td>
        <td ${valueAttrs}>${data.name}</td>
      </tr>
      <tr>
        <td ${labelAttrs}>Email:</td>
        <td ${valueAttrs}>${data.email}</td>
      </tr>
      <tr>
        <td ${labelAttrs}>Topic:</td>
        <td ${valueAttrs}>${data.topic}</td>
      </tr>
      <tr>
        <td ${labelAttrs}>Message:</td>
        <td ${valueAttrs}>${data.message}</td>
      </tr>
      <tr>
        <td ${labelAttrs}>Submitted On:</td>
        <td ${valueAttrs}>${new Date().toUTCString()}.</td>
      </tr>
    ${commonAfter}
  `;
}


export function job(data:JobData) {
  return  `
    ${commonBefore('Job Application Form')}
    <tr>
      <td ${labelAttrs}>Name:</td>
      <td ${valueAttrs}>${data.name}</td>
    </tr>
    <tr>
      <td ${labelAttrs}>Email:</td>
      <td ${valueAttrs}>${data.email}</td>
    </tr>
    <tr>
      <td ${labelAttrs}>Phone:</td>
      <td ${valueAttrs}>${data.phone}</td>
    </tr>
    <tr>
      <td ${labelAttrs}>Position:</td>
      <td ${valueAttrs}>${data.opening}</td>
    </tr>
    <tr>
      <td ${labelAttrs}>Resume:</td>
      <td ${valueAttrs}><a href="${data.resume}" target="_blank">View Resume</a></td>
    </tr>
    ${ data.coverLetter ? `
    <tr>
      <td ${labelAttrs}>Cover Letter:</td>
      <td ${valueAttrs}><a href="${data.coverLetter}" target="_blank">View Cover Letter</a></td>
    </tr>` : '' }
    ${ data.references ? `
    <tr>
      <td ${labelAttrs}>References:</td>
      <td ${valueAttrs}>${createReferences(data.references)}</td>
    </tr>
    `:''
  }
    <tr>
      <td ${labelAttrs}>Submitted On:</td>
      <td ${valueAttrs}>${new Date().toUTCString()}.</td>
    </tr>
    ${commonAfter}
  `;
}
export function support(data:SupportData) {
   return `
    ${commonBefore('Job Application Form')}
    <tr>
      <td ${labelAttrs}>Name:</td>
      <td ${valueAttrs}>${data.name}</td>
    </tr>
    <tr>
      <td ${labelAttrs}>Email:</td>
      <td ${valueAttrs}>${data.email}</td>
    </tr>

    <tr>
      <td ${labelAttrs}>Shop:</td>
      <td ${valueAttrs}>${data.shop}</td>
    </tr>
    ${genOrderDetails(data.orderDate, data.orderNumber)}
     <tr>
        <td ${labelAttrs}>Message:</td>
        <td ${valueAttrs}>${data.message}</td>
      </tr>
    <tr>
      <td ${labelAttrs}>Submitted On:</td>
      <td ${valueAttrs}>${new Date().toUTCString()}.</td>
    </tr>
    ${commonAfter}
  `
}

function createReferences(references:JobReference[]){

  let refs:string = '';

  references.forEach(r=>{
    refs+=`<p>${r.name}: ${r.relation} - <a href="mailto:${r.email}">${r.email}</a> ${r.phone} </p>`
  })

  return refs;
}