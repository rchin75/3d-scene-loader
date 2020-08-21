import * as THREE from "three";

/**
 * A bounding box that can be drawn in the scene.
 */
export default class BoundingBox {
    /**
     * Constructor.
     * @param {Object} [params] Optional parameters {color, linewidth}.
     */
    constructor(params) {
        const color = (params && params.color) ? params.color : 0x0000FF;
        const linewidth = (params && params.lineWidth) ? params.lineWidth : 5;

        const geometry = new THREE.BoxGeometry( 1,1,1 );
        const material = new THREE.LineBasicMaterial( {color, linewidth} );
        this._mesh = new THREE.LineSegments ( new THREE.EdgesGeometry(geometry), material );
        this._bounds = null;
        this._center = {x:0,y:0,z:0};
    }

    /**
     * Updates the bounding box' size and position.
     * @param object The object to bound.
     */
    update(object) {
        const helper = new THREE.BoxHelper(object);
        helper.geometry.computeBoundingBox();
        this._bounds = helper.geometry.boundingBox;

        const xSize = this._bounds.max.x - this._bounds.min.x;
        const ySize = this._bounds.max.y - this._bounds.min.y;
        const zSize = this._bounds.max.z - this._bounds.min.z;
        this._center.x = this._bounds.min.x + xSize/2;
        this._center.y = this._bounds.min.y + ySize/2;
        this._center.z = this._bounds.min.z + zSize/2;

        this._mesh.scale.set(xSize, ySize, zSize);
        this._mesh.position.set(this._center.x,this._center.y,this._center.z);
    }

    /**
     * Gets the mesh of the bounding box.
     * @returns {LineSegments}
     */
    get mesh() {
        return this._mesh;
    }

    /**
     * Gets the bounds.
     * @returns {Object}
     */
    get bounds() {
        return this._bounds;
    }

    /**
     * Gets the center of the bounding box.
     * @returns {{x: number, y: number, z: number}}
     */
    get center() {
        return this._center;
    }
}