varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement;
uniform float uTime;

void main(){
    gl_FragColor = vec4(vec3(vDisplacement), 1);
}