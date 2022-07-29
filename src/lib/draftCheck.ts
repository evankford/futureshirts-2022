const draftCheck = import.meta.env.mode == 'staging' ?'' : '';

export default draftCheck;

export function getId(id: string):string {
  if (['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(import.meta.env.mode) || ['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(process.env.NODE_ENV)) {
    return `_id == '${id}'`;
  }
  return `_id == '${id}'`;
}


export function getSingleDocument(id:string) : string {
    if (['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(import.meta.env.mode) || ['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(process.env.NODE_ENV)) {
    return  `coalesce(
      *[_id == 'drafts.${id}'][0],
      *[_id == '${id}'][0]
    )`;
  }
  return `*[_id == '${id}'][0]`;
}

export function getSingleDocumentFromSlug(slug:string) : string {
    if (['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(import.meta.env.mode) || ['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(process.env.NODE_ENV)) {
    return  `coalesce(
      *[slug.current == '${slug}' && (_id in path('drafts.**'))][0],
      *[slug.current == '${slug}'][0]
    )`;
  }
  return `*[_id == '${slug}'][0]`;
}

export function getSections() : string {
  if (['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(import.meta.env.mode) || ['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(process.env.NODE_ENV)) {
   return `*[_type == 'section' ] | order(orderRank)`;
  };
  return `*[_type == 'section' && !(_id in path("drafts.**"))] | order(orderRank)`;
}
