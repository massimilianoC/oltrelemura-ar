AFRAME.registerComponent('pivot-point', {
  schema: {
    cx: {type: 'float', default: 0},
    cy: {type: 'float', default: 0},
    cz: {type: 'float', default: 0},
    ox: {type: 'float', default: 0},
    oy: {type: 'float', default: 0},
    oz: {type: 'float', default: 0},
  },
  update: function(oldData) {
    console.log(this.data);
    const originalPosition = new THREE.Vector3();
    const originalRotation = new THREE.Vector3();
    const data = oldData
      ? {
        cx: this.data.cx - oldData.cx,
        cy: this.data.cy - oldData.cy,
        cz: this.data.cz - oldData.cz
      }
      : this.data
    const el = this.el;
    const originalParent = el.object3D.parent;
    const originalGroup = el.object3D;
    originalGroup.position.set(data.ox, data.oy, data.oz);
    const outerGroup = new THREE.Group();

    console.log(originalParent);
    console.log(originalGroup);
    console.log(outerGroup);

    originalPosition.copy(originalGroup.position);
    //originalPosition.copy(new THREE.Vector3(data.ox, data.oy, data.oz));
    originalRotation.copy(originalGroup.rotation);

    // Detach current group from parent.
    originalParent.remove(originalGroup);
    outerGroup.add(originalGroup);

    // Set new group as the outer group.
    originalParent.add(outerGroup);

    // Set outer group as new object3D.
    el.object3D = outerGroup;

    // Apply pivot to original group.
    originalGroup.position.set(-1 * data.cx, -1 * data.cy, -1 * data.cz);

    // Offset the pivot so that world position not affected.
    // And restore position onto outer group.
    outerGroup.position.set(data.cx + originalPosition.x, data.cy + originalPosition.y, data.cz + originalPosition.z);

    // Transfer rotation to outer group.
    outerGroup.rotation.copy(originalGroup.rotation);
    originalGroup.rotation.set(0, 0, 0);
  }
})
