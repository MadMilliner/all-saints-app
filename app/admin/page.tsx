'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

type EditableFile = 'board' | 'jobs';

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

const FILE_OPTIONS: Array<{ value: EditableFile; label: string }> = [
  { value: 'board', label: 'Board Data (`data/board.json`)' },
  { value: 'jobs', label: 'Jobs Data (`data/jobs.json`)' },
];

const DEFAULT_BOARD_RECORD: JsonObject = {
  idNum: '',
  standing: 'active',
  name: '',
  image: '',
  pronouns: '',
};

const DEFAULT_JOB_RECORD: JsonObject = {
  id: '',
  title: '',
  startDate: '',
  compensation: '',
  status: '',
  location: '',
  aboutUs: '',
  positionOverview: [''],
  responsibilities: {
    'Worship Leadership': [''],
    'Pastoral Care': [''],
    'Community Building & Engagement': [''],
    'Fundraising & Growth': [''],
    'Administration & Collaboration': [''],
  },
  qualifications: [''],
  applicationInstructions: [''],
  applicationEmail: '',
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getNextBoardId(records: unknown[]): string {
  const numericIds = records
    .map((record) => {
      if (!record || typeof record !== 'object') {
        return NaN;
      }
      const idNum = (record as Record<string, unknown>).idNum;
      return Number(idNum);
    })
    .filter((value) => Number.isFinite(value));

  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  return String(maxId + 1);
}

function getNextJobId(records: unknown[]): string {
  const existingIds = new Set(
    records
      .map((record) => (record && typeof record === 'object' ? (record as Record<string, unknown>).id : undefined))
      .filter((id): id is string => typeof id === 'string' && id.length > 0)
  );

  const base = 'new-job';
  if (!existingIds.has(base)) {
    return base;
  }

  let counter = 2;
  while (existingIds.has(`${base}-${counter}`)) {
    counter += 1;
  }
  return `${base}-${counter}`;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeFile, setActiveFile] = useState<EditableFile>('board');
  const [content, setContent] = useState<JsonValue>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(0);
  const [boardImages, setBoardImages] = useState<string[]>([]);
  const [boardImagesLoading, setBoardImagesLoading] = useState(false);
  const [boardImageUploading, setBoardImageUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    const loadFile = async () => {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await fetch(`/api/admin/content?file=${activeFile}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        if (response.status === 401) {
          setAuthenticated(false);
        }
        setError(payload.error ?? 'Unable to load file.');
        setLoading(false);
        return;
      }

      const payload = await response.json();
      const parsed = JSON.parse(payload.content ?? 'null') as JsonValue;
      setContent(parsed);
      setSelectedRecordIndex(0);
      setLoading(false);
    };

    void loadFile();
  }, [activeFile, authenticated]);

  useEffect(() => {
    if (!authenticated || activeFile !== 'board') {
      return;
    }

    const loadBoardImages = async () => {
      setBoardImagesLoading(true);
      const response = await fetch('/api/admin/board-images', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        setBoardImagesLoading(false);
        return;
      }

      const payload = await response.json().catch(() => ({ files: [] as string[] }));
      setBoardImages(Array.isArray(payload.files) ? payload.files : []);
      setBoardImagesLoading(false);
    };

    void loadBoardImages();
  }, [activeFile, authenticated]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error ?? 'Login failed.');
      return;
    }

    setAuthenticated(true);
    setPassword('');
    setSuccess('Signed in successfully.');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    const response = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        file: activeFile,
        content: JSON.stringify(content, null, 2),
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401) {
        setAuthenticated(false);
      }
      setError(payload.error ?? 'Save failed.');
      setSaving(false);
      return;
    }

    setSuccess(`Saved ${activeFile}.json`);
    setSaving(false);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setAuthenticated(false);
    setContent(null);
    setBoardImages([]);
    setError('');
    setSuccess('Signed out.');
  };

  const refreshBoardImages = async () => {
    const response = await fetch('/api/admin/board-images', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return;
    }

    const payload = await response.json().catch(() => ({ files: [] as string[] }));
    setBoardImages(Array.isArray(payload.files) ? payload.files : []);
  };

  const uploadBoardImage = async (path: Array<string | number>, file: File | null) => {
    if (!file) {
      return;
    }

    setBoardImageUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.set('file', file);

    const response = await fetch('/api/admin/board-images', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(payload.error ?? 'Image upload failed.');
      setBoardImageUploading(false);
      return;
    }

    if (typeof payload.path === 'string') {
      updateValueAtPath(path, payload.path);
      setSuccess('Image uploaded and selected.');
    }

    await refreshBoardImages();
    setBoardImageUploading(false);
  };

  const updateValueAtPath = (path: Array<string | number>, newValue: JsonValue) => {
    setContent((previous: JsonValue) => {
      const clone = structuredClone(previous) as JsonValue;
      if (path.length === 0) {
        return newValue;
      }

      let current: unknown = clone;
      for (let index = 0; index < path.length - 1; index += 1) {
        const segment = path[index]!;
        if (typeof segment === 'number') {
          current = (current as Array<unknown>)[segment];
        } else {
          current = (current as Record<string, unknown>)[segment];
        }
      }

      const lastSegment = path[path.length - 1]!;
      if (typeof lastSegment === 'number') {
        (current as Array<unknown>)[lastSegment] = newValue;
      } else {
        (current as Record<string, unknown>)[lastSegment] = newValue;
      }

      // Keep job ids in sync with title edits.
      if (
        activeFile === 'jobs' &&
        path.length === 3 &&
        path[0] === 'jobs' &&
        typeof path[1] === 'number' &&
        path[2] === 'title'
      ) {
        const recordIndex = path[1];
        const jobsArray = (clone as Record<string, unknown>).jobs;
        if (Array.isArray(jobsArray) && jobsArray[recordIndex] && typeof jobsArray[recordIndex] === 'object') {
          const currentRecord = jobsArray[recordIndex] as Record<string, unknown>;
          const slugBase = slugify(String(newValue));
          const existingIds = new Set(
            jobsArray
              .map((record, index) =>
                index === recordIndex || !record || typeof record !== 'object'
                  ? undefined
                  : (record as Record<string, unknown>).id
              )
              .filter((id): id is string => typeof id === 'string' && id.length > 0)
          );

          let candidate = slugBase || 'new-job';
          if (existingIds.has(candidate)) {
            let suffix = 2;
            while (existingIds.has(`${candidate}-${suffix}`)) {
              suffix += 1;
            }
            candidate = `${candidate}-${suffix}`;
          }

          currentRecord.id = candidate;
        }
      }

      return clone as JsonValue;
    });
  };

  const addRecordToArray = (path: Array<string | number>) => {
    setContent((previous: JsonValue) => {
      const clone = structuredClone(previous) as JsonValue;
      let current: unknown = clone;

      for (const segment of path) {
        if (typeof segment === 'number') {
          current = (current as Array<unknown>)[segment];
        } else {
          current = (current as Record<string, unknown>)[segment];
        }
      }

      if (!Array.isArray(current)) {
        return previous;
      }

      const pathSignature = path.join('.');
      if (activeFile === 'board' && path.length === 0) {
        const record = structuredClone(DEFAULT_BOARD_RECORD);
        record.idNum = getNextBoardId(current);
        current.push(record);
        setSelectedRecordIndex(current.length - 1);
        return clone;
      }

      if (activeFile === 'jobs' && pathSignature === 'jobs') {
        const record = structuredClone(DEFAULT_JOB_RECORD);
        record.id = getNextJobId(current);
        current.push(record);
        setSelectedRecordIndex(current.length - 1);
        return clone;
      }

      const firstRecord = current[0] as JsonValue | undefined;
      if (pathSignature.endsWith('positionOverview')) {
        current.push('New overview item');
      } else if (pathSignature.endsWith('qualifications')) {
        current.push('New qualification');
      } else if (pathSignature.endsWith('applicationInstructions')) {
        current.push('New application instruction');
      } else if (pathSignature.includes('responsibilities')) {
        current.push('New responsibility');
      } else if (firstRecord && typeof firstRecord === 'object' && !Array.isArray(firstRecord)) {
        const templateRecord: Record<string, unknown> = {};
        for (const key of Object.keys(firstRecord as Record<string, unknown>)) {
          templateRecord[key] = '';
        }
        current.push(templateRecord);
      } else {
        current.push('');
      }

      return clone as JsonValue;
    });
  };

  const removeRecordFromArray = (path: Array<string | number>, indexToRemove: number) => {
    setContent((previous: JsonValue) => {
      const clone = structuredClone(previous) as JsonValue;
      let current: unknown = clone;

      for (const segment of path) {
        if (typeof segment === 'number') {
          current = (current as Array<unknown>)[segment];
        } else {
          current = (current as Record<string, unknown>)[segment];
        }
      }

      if (!Array.isArray(current)) {
        return previous;
      }

      current.splice(indexToRemove, 1);
      setSelectedRecordIndex((prevIndex) => {
        if (current.length === 0) {
          return 0;
        }
        return Math.min(prevIndex, current.length - 1);
      });
      return clone as JsonValue;
    });
  };

  const renderPrimitive = (label: string, value: string | number | boolean | null, path: Array<string | number>) => {
    const key = path[path.length - 1];
    const isReadOnlyIdField = key === 'id' || key === 'idNum';
    const isStandingField = key === 'standing';
    const isBoardImageField = activeFile === 'board' && key === 'image';

    if (isBoardImageField) {
      return (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <div className="form-control mb-2 bg-light-subtle">
            {value === null || String(value).trim() === '' ? 'No image selected' : String(value)}
          </div>
          <div className="d-flex flex-wrap gap-2 mb-2">
            <select
              className="form-select"
              value={value === null ? '' : String(value)}
              onChange={(event) => updateValueAtPath(path, event.target.value)}
              style={{ maxWidth: 420 }}
              disabled={boardImagesLoading}
            >
              <option value="">Select image from /img/board</option>
              {boardImages.map((imagePath) => (
                <option key={imagePath} value={imagePath}>
                  {imagePath}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => void refreshBoardImages()}
              disabled={boardImagesLoading}
            >
              {boardImagesLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png,.webp,.gif"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              void uploadBoardImage(path, file);
              event.currentTarget.value = '';
            }}
            disabled={boardImageUploading}
          />
          <small className="text-muted">
            Upload new image.
          </small>
        </div>
      );
    }

    if (isStandingField) {
      return (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <select
            className="form-select"
            value={value === 'inactive' ? 'inactive' : 'active'}
            onChange={(event) => updateValueAtPath(path, event.target.value)}
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <select
            className="form-select"
            value={String(value)}
            onChange={(event) => updateValueAtPath(path, event.target.value === 'true')}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <input
            className="form-control"
            type="number"
            value={String(value)}
            readOnly={isReadOnlyIdField}
            onChange={(event) => updateValueAtPath(path, Number(event.target.value))}
          />
        </div>
      );
    }

    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input
          className="form-control"
          type="text"
          value={value === null ? '' : String(value)}
          readOnly={isReadOnlyIdField}
          onChange={(event) => updateValueAtPath(path, event.target.value)}
        />
      </div>
    );
  };

  const renderNode = (
    node: unknown,
    label: string,
    path: Array<string | number>,
    arrayContext: { path: Array<string | number>; index: number } | null = null
  ): React.ReactNode => {
    if (Array.isArray(node)) {
      return (
        <div className="border rounded p-3 mb-3 bg-light-subtle">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="h6 mb-0">{label}</h3>
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => addRecordToArray(path)}>
              Add New Record
            </button>
          </div>
          {node.length === 0 ? <p className="text-muted mb-0">No records yet.</p> : null}
          {node.map((item, index) => (
            <div key={`${label}-${index}`} className="border rounded bg-white p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold">Record {index + 1}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeRecordFromArray(path, index)}
                >
                  Remove
                </button>
              </div>
              {renderNode(item, `Item ${index + 1}`, [...path, index], { path, index })}
            </div>
          ))}
        </div>
      );
    }

    if (node && typeof node === 'object') {
      const entries = Object.entries(node as Record<string, unknown>);
      return (
        <div className={arrayContext ? '' : 'border rounded p-3 mb-3'}>
          {!arrayContext ? <h2 className="h6 mb-3">{label}</h2> : null}
          {entries.map(([key, value]) => (
            <div key={key}>
              {Array.isArray(value) || (value && typeof value === 'object')
                ? renderNode(value, key, [...path, key])
                : renderPrimitive(key, value as string | number | boolean | null, [...path, key])}
            </div>
          ))}
        </div>
      );
    }

    return renderPrimitive(label, node as string | number | boolean | null, path);
  };

  const recordCollection =
    activeFile === 'board'
      ? (Array.isArray(content) ? content : [])
      : content && typeof content === 'object' && Array.isArray((content as Record<string, unknown>).jobs)
        ? ((content as Record<string, unknown>).jobs as unknown[])
        : [];

  const selectedRecord = recordCollection[selectedRecordIndex];
  const selectedRecordPath: Array<string | number> =
    activeFile === 'board' ? [selectedRecordIndex] : ['jobs', selectedRecordIndex];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
              <h1 className="h3 mb-3">All Saints Content Admin</h1>
              <p className="text-muted mb-4">
                Admin page to update Board and Jobs.
              </p>

              {error ? <div className="alert alert-danger">{error}</div> : null}
              {success ? <div className="alert alert-success">{success}</div> : null}

              {!authenticated ? (
                <form onSubmit={handleLogin} className="row g-3">
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Admin Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                      Sign In
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="d-flex flex-wrap align-items-center gap-4 mb-3">
                    <h3 className="h5 mb-0">
                      <button
                        type="button"
                        className={`btn p-0 border-0 text-decoration-underline ${activeFile === 'board' ? 'fw-bold' : ''}`}
                        onClick={() => setActiveFile('board')}
                      >
                        Board
                      </button>
                    </h3>
                    <h3 className="h5 mb-0">
                      <button
                        type="button"
                        className={`btn p-0 border-0 text-decoration-underline ${activeFile === 'jobs' ? 'fw-bold' : ''}`}
                        onClick={() => setActiveFile('jobs')}
                      >
                        Jobs
                      </button>
                    </h3>
                    <button type="button" className="btn btn-outline-secondary ms-auto" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>

                  <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                    <label htmlFor="recordSelect" className="form-label mb-0">
                      Record
                    </label>
                    <select
                      id="recordSelect"
                      className="form-select w-auto"
                      value={selectedRecordIndex}
                      onChange={(event) => setSelectedRecordIndex(Number(event.target.value))}
                      disabled={recordCollection.length === 0}
                    >
                      {recordCollection.map((record, index) => {
                        const recordLabel =
                          activeFile === 'board'
                            ? `#${(record as Record<string, unknown>)?.idNum ?? index + 1} ${(record as Record<string, unknown>)?.name ?? ''}`
                            : `${(record as Record<string, unknown>)?.id ?? `Record ${index + 1}`}`;
                        return (
                          <option key={`record-${index}`} value={index}>
                            {recordLabel}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => addRecordToArray(activeFile === 'board' ? [] : ['jobs'])}
                    >
                      Add New Board Member
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        removeRecordFromArray(activeFile === 'board' ? [] : ['jobs'], selectedRecordIndex)
                      }
                      disabled={recordCollection.length === 0}
                    >
                      Delete Board Member
                    </button>
                  </div>

                  <div className="mb-3">
                    {loading ? (
                      <div className="text-muted">Loading editor...</div>
                    ) : recordCollection.length === 0 ? (
                      <div className="text-muted">No records yet. Click "Add New Record".</div>
                    ) : (
                      renderNode(selectedRecord, activeFile === 'board' ? 'Board Record' : 'Job Record', selectedRecordPath)
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSave}
                      disabled={saving || loading}
                    >
                      {saving ? 'Saving...' : 'Save JSON'}
                    </button>
                    {loading ? <span className="text-muted align-self-center">Loading...</span> : null}
                  </div>
                </>
              )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
