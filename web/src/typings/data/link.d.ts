enum TypeLink {
  Common = 1,
  Friend = 2,
  Blog = 3,
}

export interface LinkItem {
  key: string
  linkName: string
  linkAddress: string
  linkType: TypeLink
}
