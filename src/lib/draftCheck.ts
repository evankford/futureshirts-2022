const draftCheck = import.meta.env.mode == 'staging' ?'' : '';
export default draftCheck;

function isPreview(){
  return (['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(import.meta.env.mode) || ['staging', 'development', 'dev', 'DEVELOPMENT', 'STAGING'].includes(process.env.NODE_ENV) || import.meta.env.VITE_IS_PREVIEW === 'true');
}

export function getId(id: string):string {
  if (isPreview()){
    return `_id == '${id}'`;
  }
  return `_id == '${id}'`;
}


export function getSingleDocument(id:string) : string {
    if (isPreview()){
    return  `coalesce(
      *[_id == 'drafts.${id}'][0],
      *[_id == '${id}'][0]
    )`;
  }
  return `*[_id == '${id}'][0]`;
}



export function getActiveJobs(id:string) : string {
    if (isPreview()){
        return  `coalesce(
      *[_id == 'drafts.${id}'][0],
      *[_id == '${id}'][0]
    )`;
    }
    return `*[_id == '${id}'][0]`;
}

export function getSingleDocumentFromSlug(slug:string, type: null|string = null) : string {
    if (isPreview()){
        if (type) {
            return  `coalesce(
          *[_type == '${type}' && slug.current == '${slug}' && (_id in path('drafts.**'))][0],
          *[_type == '${type}' && slug.current == '${slug}'][0]
        )`;
        }
        return  `coalesce(
          *[slug.current == '${slug}' && (_id in path('drafts.**'))][0],
          *[slug.current == '${slug}'][0]
        )`;
  }
    if (type) {
        return `*[_type =='${type}' && slug.current =='${slug}'][0]`
    }

  return `*[slug.current == '${slug}'][0]`;
}

export function getSections() : string {
  if (isPreview()){
   return `*[ _type == 'section' && !defined(*[_id == "drafts." + ^._id][0])] | order(orderRank)`;
  }
  return `*[_type == 'section' && !(_id in path("drafts.**"))] | order(orderRank)`;
}

export function getTeamMembers() : string {
  if (isPreview()){
   return `*[ _type == 'teamMember' && active && !defined(*[_id == "drafts." + ^._id][0])]`;
  }
  return `*[_type == 'teamMember' && active && !(_id in path("drafts.**"))]`;
}

export function getPartners() : string {
  if (isPreview()){
   return `*[ _type == 'partner' && active && !defined(*[_id == "drafts." + ^._id][0])]`;
  }
  return `*[_type == 'partner' && active && !(_id in path("drafts.**"))]`;
}

export function getFeaturedPartners() : string {
  if (isPreview()){
   return `*[ _type == 'partner' && active && featured && !defined(*[_id == "drafts." + ^._id][0])]`;
  }
  return `*[_type == 'partner' && active && featured && !(_id in path("drafts.**"))]`;
}
