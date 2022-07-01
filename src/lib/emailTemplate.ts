import mjml2html from 'mjml';

const labelAttrs = ' align="left" style="background:#fafafa; font-weight:700;"'
const valueAttrs = ' align="left" colspan="3"';

const commonHead = `
  <mj-attributes>
    <mj-table padding="8px 0" />
    <mj-class name="heading" font-size="32px" font-weight="600" />
    <mj-all />
  </mj-attributes>
  <mj-style inline="inline">
  td, th {
    padding: 6px;
  }
  th {
    background: #efefef;
    border-bottom: 1px solid #afafaf;
  }
  </mj-style>
`;
function commonBefore(formTitle:string = 'Contact Form') {
  return `
   <mjml>
   <mj-head>
    ${commonHead}
   </mj-head>
    <mj-body>
      <mj-section>
        <mj-text>
          <h1 mj-class="heading">New ${formTitle} Message</h1>
          <p>You have a new message from the Futureshirts ${formTitle}. The details are below. You may reply to this message to respond to the submission directly.</p>
        </mj-text>
      </mj-section>
      <mj-section>
        <mj-table>
        <tr>
          <th align="left" color="#8f8f8f" font-weight="700" colspan="1">Field</th>
          <th align="left" color="#8f8f8f" font-weight="700" colspan="3">Value</th>
        </tr>`;
}

const commonAfter =`
    </mj-table>
      </mj-section>
    </mj-body>
  </mjml>`;




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
  return mjml2html(
  `
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
  `);
}


export function job(data:JobData) {
  const str =  `
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
      <td ${valueAttrs}>Attached</td>
    </tr>
    <tr>
      <td ${labelAttrs}>Cover Letter:</td>
      <td ${valueAttrs}>Attached</td>
    </tr>
    <tr>
      <td ${labelAttrs}>References:</td>
      <td ${valueAttrs}>${data.references}</td>
    </tr>
    <tr>
      <td ${labelAttrs}>Submitted On:</td>
      <td ${valueAttrs}>${new Date().toUTCString()}.</td>
    </tr>
    ${commonAfter}
  `;
  return mjml2html(str);
}
export function support(data:SupportData) {
  console.log(data);
  return mjml2html(
    `
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
  )
}