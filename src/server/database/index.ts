import { Blob } from "../models/blob";
import blobsJson from "./initial-data.json"

// This variable represent the fake database
// Warning : Since it's stored in RAM, the database will be reset each time the server restarts
let _blobs: Blob[] = [];

// Init database with initial data file
function init(): void {
  _blobs = (blobsJson as Blob[]).map((b) => {
    b.createdAt = new Date();
    return b;
  });
}

function getNextId(): string {
  if (_blobs.length === 0) {
    return '00001';
  }

  const latestId = _blobs[_blobs.length - 1].id;
  const latestIdNumber = parseInt(latestId, 10);
  const nextIdNumber = latestIdNumber + 1;
  const nextId = nextIdNumber.toString().padStart(5, '0');
  return nextId;
}

function list(): Blob[] {
  return _blobs;
}

function get(id: string): Blob | null {
  const blob = _blobs.find((b) => b.id === id);
  return blob || null;
}

function add(blob: Blob): void {
  blob.id = getNextId();
  blob.createdAt = new Date();
  blob.updatedAt = new Date();
  _blobs.push(blob);
}

function remove(id: string): void {
  _blobs = _blobs.filter((blob) => blob.id !== id);
}

function update(blob: Blob): void {
  _blobs = _blobs.map((b) => {
    if (b.id === blob.id) {
      return {
        ...b,
        ...blob,
        updatedAt: new Date()
      };
    } else {
      return b;
    }
  });
}

export default { 
  init,
  list,
  get,
  add,
  remove,
  update
};