export default {
  title: 'Redirection',
  name: 'redirection',
  type: 'document',
	__experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
	fields: [
    {
      name: 'redirects',
      title: 'Redirects',
      type: 'array',
      of: [
        {type:'redirect'}
      ]
    }
  ]
}