function PostForm({
  form,
  onChange,
  onFileChange,
  onSubmit,
  submitLabel,
  showImageRequiredHint = true,
}) {
  return (
    <form className="form-grid post-form" onSubmit={onSubmit}>
      <label className="field-label">
        Post title
        <input
          className="input"
          name="post_name"
          value={form.post_name}
          onChange={onChange}
          placeholder="Give your post a clear title"
        />
      </label>

      <label className="field-label">
        Description
        <textarea
          className="textarea"
          name="desc"
          value={form.desc}
          onChange={onChange}
          placeholder="Write the full story or context behind this image"
        />
      </label>

      <label className="field-label">
        Upload image
        <input className="file-input" type="file" accept="image/*" onChange={onFileChange} />
      </label>

      {showImageRequiredHint ? (
        <p className="helper-text">
          Upload a clear image file. Your backend expects the image field name to be <code>post</code>.
        </p>
      ) : null}

      <div className="form-actions">
        <button type="submit" className="button-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
