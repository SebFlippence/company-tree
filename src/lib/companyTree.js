'use strict'

let getManagersFromTree = (tree, managers = []) => {
  tree.map((member) => {
    if ('staff' in member) {
      managers.push('directs-' + member.email)
      managers.concat(getManagersFromTree(member.staff, managers))
    }
  })

  return managers
}

let companyTree = {
  getDirectsFromTree: (tree, directs = {}) => {
    tree.map((member) => {
      if ('staff' in member) {
        directs['directs-' + member.email] = member.staff.map((staff) => {
          if ('staff' in staff) {
            companyTree.getDirectsFromTree(member.staff, directs)
          }
          return staff.email
        }).concat([member.email])
      }
    })

    return directs
  },
  getAllFromDirects: (tree, all = {}) => {
    tree.map((member) => {
      if ('staff' in member) {
        let managers = getManagersFromTree(member.staff)
        if (managers.length) {
          all['all-' + member.email] = managers
          companyTree.getAllFromDirects(member.staff, all)
        }
      }
    })

    return all
  }
}

module.exports = companyTree
