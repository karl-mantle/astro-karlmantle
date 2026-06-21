// ? https://codepen.io/jkantner/pen/WbQVMBE

type Matrix3x3 = number[][];

type Charsets = {
  [key: string]: string;
};

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface RenderState {
  charset: keyof Charsets;
  speed: number;
  size: number;
  angleX: number;
  angleY: number;
  angleZ: number;
  distance: number;
  width: number;
  height: number;
  screen: string[];
  zBuffer: number[];
}

class ASCIICube {
  charsets: Charsets = {
    standard: " '`.,:;+=xo*WMB&8%#@",
    dense: " ░▒▓█",
    blocks: "KARLMNTE",
    debug: "0123456789",
  };
  outputEl?: HTMLElement;
  renderState: RenderState = {
    charset: Object.keys(this.charsets)[0],
    speed: 0.5,
    size: 80,
    angleX: (45 * Math.PI) / 180,
    angleY: 0 * Math.PI,
    angleZ: (-45 * Math.PI) / 180,
    distance: 10,
    width: 80,
    height: 80,
    screen: [],
    zBuffer: [],
  };

  constructor(el: HTMLElement) {
    this.outputEl = el;
  }

  /** Run the animation loop. */
  animate(): void {
    if (!this.outputEl?.isConnected) {
      return;
    }

    const { speed } = this.renderState;
    const fullCircle = 2 * Math.PI;
    const fraction = fullCircle / 120;

    this.renderState.angleX += -fraction * speed;
    this.renderState.angleX %= fullCircle;
    this.renderState.angleZ += fraction * speed;
    this.renderState.angleZ %= fullCircle;

    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }

  /** Check if the user’s theme is dark. */
  private get isDark() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    return mediaQuery.matches;
  }

  /**
   * Draw a triangle to the screen buffer.
   * @param v1 First vertex
   * @param v2 Second vertex
   * @param v3 Third vertex
   * @param brightness Brightness level
   */
  private drawTriangle(v1: Point3D, v2: Point3D, v3: Point3D, brightness: number): void {
    const { charset, width, height } = this.renderState;
    let chars = this.charsets[charset];
    // reverse charset for light theme
    if (!this.isDark) chars = Utils.reverseString(chars);

    const charIndex = Math.floor(brightness * (chars.length - 1));
    const char = chars[charIndex];
    const minX = Math.max(0, Math.min(v1.x, v2.x, v3.x));
    const maxX = Math.min(width - 1, Math.max(v1.x, v2.x, v3.x));
    const minY = Math.max(0, Math.min(v1.y, v2.y, v3.y));
    const maxY = Math.min(height - 1, Math.max(v1.y, v2.y, v3.y));

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (Utils.isInsideTriangle(x, y, v1, v2, v3)) {
          const z = Utils.interpolateZ(v1, v2, v3);
          const index = y * width + x;

          if (z < this.renderState.zBuffer[index]) {
            this.renderState.zBuffer[index] = z;
            this.renderState.screen[index] = char;
          }
        }
      }
    }
  }

  /** Initialize the screen buffer. */
  private initScreen(): void {
    const { width, height, screen, zBuffer } = this.renderState;

    for (let i = 0; i < width * height; i++) {
      screen[i] = " ";
      zBuffer[i] = Infinity;
    }
  }

  /** Render the cube to ASCII. */
  private render(): void {
    this.initScreen();
    // create the rotation matrix
    const { angleX, angleY, angleZ } = this.renderState;
    const rx = Utils.rotateX(angleX);
    const ry = Utils.rotateY(angleY);
    const rz = Utils.rotateZ(angleZ);
    const rotation = Utils.multiplyMatrix(Utils.multiplyMatrix(rx, ry), rz);

    // transform the vertices
    const cubeVertices = [
      new Vector3(-1, -1, -1),
      new Vector3(1, -1, -1),
      new Vector3(1, 1, -1),
      new Vector3(-1, 1, -1),
      new Vector3(-1, -1, 1),
      new Vector3(1, -1, 1),
      new Vector3(1, 1, 1),
      new Vector3(-1, 1, 1),
    ];
    const transformedVertices = cubeVertices.map((v) => {
      const rotated = Utils.transformVertex(v, rotation);
      const { width, height, size, distance } = this.renderState;

      return Utils.projectVertex(rotated, width, height, size, distance);
    });

    // light direction
    const lightDir = new Vector3(0.5, 0.5, -1).normalize();

    // draw the faces
    const cubeFaces = [
      [0, 1, 2],
      [0, 2, 3], // front
      [5, 4, 7],
      [5, 7, 6], // back
      [4, 0, 3],
      [4, 3, 7], // left
      [1, 5, 6],
      [1, 6, 2], // right
      [3, 2, 6],
      [3, 6, 7], // top
      [4, 5, 1],
      [4, 1, 0], // bottom
    ];
    const faceNormals = [
      new Vector3(0, 0, -1),
      new Vector3(0, 0, -1), // front
      new Vector3(0, 0, 1),
      new Vector3(0, 0, 1), // back
      new Vector3(-1, 0, 0),
      new Vector3(-1, 0, 0), // left
      new Vector3(1, 0, 0),
      new Vector3(1, 0, 0), // right
      new Vector3(0, 1, 0),
      new Vector3(0, 1, 0), // top
      new Vector3(0, -1, 0),
      new Vector3(0, -1, 0), // bottom
    ];
    cubeFaces.forEach((face, faceIndex) => {
      const v1 = transformedVertices[face[0]];
      const v2 = transformedVertices[face[1]];
      const v3 = transformedVertices[face[2]];

      // calculate the lighting
      const normal = Utils.transformVertex(faceNormals[faceIndex], rotation);
      const brightness = Math.max(0.1, Math.abs(normal.dot(lightDir)));
      const { width, height } = this.renderState;
      const v1InBounds = Utils.isVertexInBounds(v1, width, height);
      const v2InBounds = Utils.isVertexInBounds(v2, width, height);
      const v3InBounds = Utils.isVertexInBounds(v3, width, height);

      if (v1InBounds && v2InBounds && v3InBounds) {
        this.drawTriangle(v1, v2, v3, brightness);
      }
    });

    // convert the screen buffer to a string
    const { height, width, screen } = this.renderState;
    let output = "";

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        output += screen[y * width + x];
      }
      output += "\n";
    }
    if (this.outputEl) {
      this.outputEl.textContent = output;
    }
  }
}

class Utils {
  /**
   * Interpolate a z value for a point in a triangle.
   * @param v1 First 3D coordinate set
   * @param v2 Second 3D coordinate set
   * @param v3 Third 3D coordinate set
   */
  static interpolateZ(v1: Point3D, v2: Point3D, v3: Point3D): number {
    return (v1.z + v2.z + v3.z) / 3;
  }
  /**
   * Check if a 2D point is inside a triangle.
   * @param x 2D x-coordinate
   * @param y 2D y-coordinate
   * @param v1 First vertex coordinate pair
   * @param v2 Second vertex coordinate pair
   * @param v3 Third vertex coordinate pair
   */
  static isInsideTriangle(x: number, y: number, v1: Point2D, v2: Point2D, v3: Point2D): boolean {
    const d1 = this.sign({ x, y }, v1, v2);
    const d2 = this.sign({ x, y }, v2, v3);
    const d3 = this.sign({ x, y }, v3, v1);
    const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
    const hasPos = d1 > 0 || d2 > 0 || d3 > 0;

    return !(hasNeg && hasPos);
  }
  /**
   * Check if a vertex is within the output bounds.
   * @param vertex Vertex object
   * @param width Output area width
   * @param height Output area height
   */
  static isVertexInBounds(vertex: Point3D, width: number, height: number): boolean {
    const inWidth = vertex.x >= 0 && vertex.x < width;
    const inHeight = vertex.y >= 0 && vertex.y < height;

    return inWidth && inHeight;
  }
  /**
   * Multiply two 3x3 matrices.
   * @param m1 First matrix
   * @param m2 Second matrix
   */
  static multiplyMatrix(m1: Matrix3x3, m2: Matrix3x3): Matrix3x3 {
    const result: Matrix3x3 = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          result[i][j] += m1[i][k] * m2[k][j];
        }
      }
    }

    return result;
  }
  /**
   * Project a 3D vertex to 2D screen coordinates.
   * @param vertex Vertex object
   * @param width Output area width
   * @param height Output area height
   * @param size Cube size
   * @param distance Cube distance
   */
  static projectVertex(
    vertex: Vector3,
    width: number,
    height: number,
    size: number,
    distance: number,
  ): Point3D {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const vertexXHandled = vertex.x / (vertex.z + distance);
    const vertexYHandled = -vertex.y / (vertex.z + distance);
    const x = Math.floor(vertexXHandled * size + halfWidth);
    const y = Math.floor(vertexYHandled * size + halfHeight);

    return { x, y, z: vertex.z };
  }
  /**
   * Reverse the characters of a string.
   * @param str String to reverse
   */
  static reverseString(str: string) {
    let reversed = "";

    for (let i = str.length - 1; i >= 0; i--) {
      reversed += str[i];
    }

    return reversed;
  }
  /**
   * Create an x-rotation matrix.
   * @param angle Angle in radians
   */
  static rotateX(angle: number): Matrix3x3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return [
      [1, 0, 0],
      [0, cos, -sin],
      [0, sin, cos],
    ];
  }
  /**
   * Create a y-rotation matrix.
   * @param angle Angle in radians
   */
  static rotateY(angle: number): Matrix3x3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return [
      [cos, 0, sin],
      [0, 1, 0],
      [-sin, 0, cos],
    ];
  }
  /**
   * Create a z-rotation matrix.
   * @param angle Angle in radians
   */
  static rotateZ(angle: number): Matrix3x3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return [
      [cos, -sin, 0],
      [sin, cos, 0],
      [0, 0, 1],
    ];
  }
  /**
   * Sign function for triangle testing.
   * @param p1 First 2D coordinate pair
   * @param p2 Second 2D coordinate pair
   * @param p3 Third 2D coordinate pair
   */
  static sign(p1: Point2D, p2: Point2D, p3: Point2D): number {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  }
  /**
   * Transform a vertex using a matrix.
   * @param vertex Vertex object
   * @param matrix Matrix
   */
  static transformVertex(vertex: Vector3, matrix: Matrix3x3): Vector3 {
    const [top, middle, bottom] = matrix;
    const [t0, t1, t2] = top;
    const [m0, m1, m2] = middle;
    const [b0, b1, b2] = bottom;
    const { x, y, z } = vertex;

    return new Vector3(
      t0 * x + t1 * y + t2 * z,
      m0 * x + m1 * y + m2 * z,
      b0 * x + b1 * y + b2 * z,
    );
  }
}

class Vector3 {
  x: number;
  y: number;
  z: number;

  /**
   * Create a vector with a 3D coordinate set.
   * @param x x-coordinate
   * @param y y-coordinate
   * @param z z-coordinate
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  dot(v: Vector3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  normalize(): Vector3 {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);

    if (length === 0) return new Vector3();

    const vx = this.x / length;
    const vy = this.y / length;
    const vz = this.z / length;

    return new Vector3(vx, vy, vz);
  }
}

export { ASCIICube };
