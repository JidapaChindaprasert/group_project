import { useEffect, useState } from "react";
import "./Admin.css";

export default function Admin() {
    const [professors, setProfessors] = useState<any[]>([]);
    const [filterDepartment, setFilterDepartment] = useState<string>("all");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<any>(null);

    const [dates, setDates] = useState<any[]>([]);
    const [editingDateId, setEditingDateId] = useState<number | null>(null);
    const [editDateForm, setEditDateForm] = useState<any>(null);
    const [newDateForm, setNewDateForm] = useState({ date: '', event_text: '' });

    // Curriculum Management State
    const [currProgram, setCurrProgram] = useState<string>("iot");
    const [currYears, setCurrYears] = useState<string[]>([]);
    const [currSelectedYear, setCurrSelectedYear] = useState<string>("");
    const [newYear, setNewYear] = useState<string>("");
    const [currMetadata, setCurrMetadata] = useState({ pdfUrl: "", pdfLabel: "" });
    const [isSavingCurr, setIsSavingCurr] = useState(false);
    const [currCourses, setCurrCourses] = useState<any[]>([]);
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
    const [editCourseForm, setEditCourseForm] = useState<any>(null);
    const [newCourseForm, setNewCourseForm] = useState({
        id: '', name: '', description: '', col: 1, row: 1,
        mobile_col: 1, mobile_row: 1, plan_group: '', plan_label: ''
    });

    const fetchProfessors = () => {
        let url = "http://localhost:3001/professors";
        if (filterDepartment !== "all") {
            url += `?department=${filterDepartment}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => setProfessors(data));
    };

    const fetchDates = () => {
        fetch("http://localhost:3001/api/important-dates")
            .then(res => res.json())
            .then(data => setDates(data))
            .catch(err => console.error("Error fetching dates:", err));
    };

    useEffect(() => {
        fetchProfessors();
    }, [filterDepartment]);

    useEffect(() => {
        fetchDates();
    }, []);

    // Curriculum Fetching
    useEffect(() => {
        const fetchYears = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/curriculum/${currProgram}/years`);
                const years = await res.json();
                setCurrYears(years);
                if (years.length > 0 && !currSelectedYear) setCurrSelectedYear(years[0]);
            } catch (err) {
                console.error("Error fetching years:", err);
            }
        };
        fetchYears();
    }, [currProgram, currSelectedYear]);

    useEffect(() => {
        if (!currSelectedYear) return;
        const fetchMetadata = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/curriculum/${currProgram}/${currSelectedYear}/metadata`);
                const meta = await res.json();
                setCurrMetadata({ pdfUrl: meta.pdfUrl || "", pdfLabel: meta.pdfLabel || "" });
            } catch (err) {
                console.error("Error fetching metadata:", err);
            }
        };
        fetchMetadata();
    }, [currProgram, currSelectedYear]);

    const handleSaveCurrMetadata = async () => {
        setIsSavingCurr(true);
        const yearToSave = newYear || currSelectedYear;
        if (!yearToSave) {
            alert("Please select or enter a year");
            setIsSavingCurr(false);
            return;
        }
        try {
            const res = await fetch(`http://localhost:3001/api/curriculum/metadata`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    program: currProgram,
                    curriculumYear: yearToSave,
                    pdfUrl: currMetadata.pdfUrl,
                    pdfLabel: currMetadata.pdfLabel
                })
            });
            if (res.ok) {
                alert("Metadata saved successfully!");
                if (newYear) {
                    setCurrSelectedYear(newYear);
                    setNewYear("");
                }
            } else {
                alert("Failed to save metadata");
            }
        } catch (err) {
            console.error("Error saving metadata:", err);
            alert("Error saving metadata");
        } finally {
            setIsSavingCurr(false);
        }
    };

    const fetchCurrCourses = async () => {
        if (!currSelectedYear) return;
        try {
            const res = await fetch(`http://localhost:3001/api/curriculum/${currProgram}/${currSelectedYear}`);
            const data = await res.json();
            setCurrCourses(data);
        } catch (err) {
            console.error("Error fetching admin courses:", err);
        }
    };

    useEffect(() => {
        fetchCurrCourses();
    }, [currProgram, currSelectedYear]);

    const handleCourseEditClick = (c: any) => {
        setEditingCourseId(c.id);
        setEditCourseForm({ ...c });
    };

    const handleCourseSaveClick = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3001/api/curriculum/${currProgram}/${currSelectedYear}/courses/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editCourseForm)
            });
            if (res.ok) {
                setEditingCourseId(null);
                fetchCurrCourses();
            } else {
                alert("Failed to update course");
            }
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const handleNewCourseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currSelectedYear) return alert("Select a year first");
        try {
            const res = await fetch(`http://localhost:3001/api/curriculum/${currProgram}/${currSelectedYear}/courses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCourseForm)
            });
            if (res.ok) {
                setNewCourseForm({
                    id: '', name: '', description: '', col: 1, row: 1,
                    mobile_col: 1, mobile_row: 1, plan_group: '', plan_label: ''
                });
                fetchCurrCourses();
                alert("Course added successfully");
            } else {
                const err = await res.json();
                alert("Failed to add course: " + err.error);
            }
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    const handleCourseDeleteClick = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this subject?")) return;
        try {
            const res = await fetch(`http://localhost:3001/api/curriculum/${currProgram}/${currSelectedYear}/courses/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                fetchCurrCourses();
            } else {
                alert("Failed to delete course");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };
    const handleEditClick = (p: any) => {
        setEditingId(p.id);
        setEditFormData({ ...p });
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditFormData(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let finalValue: any = value;

        if (type === 'checkbox') {
            finalValue = (e.target as HTMLInputElement).checked ? 1 : 0;
        } else if (name === 'sort_order') {
            finalValue = parseInt(value, 10);
        } else if (name === 'education_history' || name === 'expertise') {
            finalValue = value;
        }

        setEditFormData({
            ...editFormData,
            [name]: finalValue,
        });
    };

    const handleSaveClick = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/professors/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                setEditingId(null);
                setEditFormData(null);
                fetchProfessors();
            } else {
                const errorData = await response.json();
                alert(`Failed to update professor: ${errorData.error || response.statusText}`);
            }
        } catch (error) {
            console.error("Error updating professor:", error);
            alert("Error updating professor");
        }
    };

    const handleDateEditClick = (d: any) => {
        setEditingDateId(d.id);
        setEditDateForm({ ...d });
    };

    const handleDateCancelClick = () => {
        setEditingDateId(null);
        setEditDateForm(null);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditDateForm({ ...editDateForm, [name]: value });
    };

    const handleDateSaveClick = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3001/api/important-dates/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editDateForm),
            });
            if (response.ok) {
                setEditingDateId(null);
                setEditDateForm(null);
                fetchDates();
            } else {
                alert("Failed to update date");
            }
        } catch (error) {
            console.error("Error updating date:", error);
        }
    };

    const handleDateDeleteClick = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this date?")) return;
        try {
            const response = await fetch(`http://localhost:3001/api/important-dates/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchDates();
            }
        } catch (error) {
            console.error("Error deleting date:", error);
        }
    };

    const handleNewDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewDateForm({ ...newDateForm, [name]: value });
    };

    const handleNewDateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/important-dates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDateForm),
            });
            if (response.ok) {
                setNewDateForm({ date: '', event_text: '' });
                fetchDates();
            }
        } catch (error) {
            console.error("Error creating date:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Professor Table</h1>

            <div className="admin-controls">
                <label htmlFor="dept-filter">Filter by Department: </label>
                <select
                    id="dept-filter"
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="dept-select"
                >
                    <option value="all">All Departments</option>
                    <option value="iot">IoT</option>
                    <option value="phys">Physics</option>
                </select>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Dept. ID</th>
                            <th>Name (TH)</th>
                            <th>Position</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Is Head</th>
                            <th>Edu. History</th>
                            <th>Expertise</th>
                            <th>Sort Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {professors.map((p) => (
                            <tr key={p.id}>
                                {editingId === p.id ? (
                                    <>
                                        <td>{p.id}</td>
                                        <td><input type="text" name="department_id" value={editFormData.department_id} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="name_th" value={editFormData.name_th} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="position" value={editFormData.position} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="image" value={editFormData.image} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="email" value={editFormData.email} onChange={handleChange} className="edit-input" /></td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name="is_head"
                                                checked={!!editFormData.is_head}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td><input type="text" name="education_history" value={typeof editFormData.education_history === 'string' ? editFormData.education_history : JSON.stringify(editFormData.education_history)} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="text" name="expertise" value={typeof editFormData.expertise === 'string' ? editFormData.expertise : JSON.stringify(editFormData.expertise)} onChange={handleChange} className="edit-input" /></td>
                                        <td><input type="number" name="sort_order" value={editFormData.sort_order} onChange={handleChange} className="edit-input" style={{ width: '60px' }} /></td>
                                        <td className="actions-cell">
                                            <button onClick={() => handleSaveClick(p.id)} className="btn-save">Save</button>
                                            <button onClick={handleCancelClick} className="btn-cancel">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{p.id}</td>
                                        <td>{p.department_id}</td>
                                        <td>{p.name_th}</td>
                                        <td>{p.position}</td>
                                        <td>
                                            {p.image ? (
                                                <img src={p.image} alt={p.name_th || 'Professor'} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>
                                        <td>{p.email}</td>
                                        <td>{p.is_head ? "Yes" : "No"}</td>
                                        <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={typeof p.education_history === 'string' ? p.education_history : JSON.stringify(p.education_history)}>
                                            {typeof p.education_history === 'string' ? p.education_history : JSON.stringify(p.education_history)}
                                        </td>
                                        <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={typeof p.expertise === 'string' ? p.expertise : JSON.stringify(p.expertise)}>
                                            {typeof p.expertise === 'string' ? p.expertise : JSON.stringify(p.expertise)}
                                        </td>
                                        <td>{p.sort_order}</td>
                                        <td className="actions-cell">
                                            <button onClick={() => handleEditClick(p)} className="btn-edit">Edit</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="admin-table-wrapper" style={{ marginTop: '4rem', paddingBottom: '2rem', borderTop: '1px solid #333', paddingTop: '2rem' }}>
                <h1 className="admin-title">Curriculum Management (PDF & Files)</h1>
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', background: '#1e1e1e', padding: '2rem', borderRadius: '12px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Program:</label>
                        <select
                            value={currProgram}
                            onChange={(e) => setCurrProgram(e.target.value)}
                            className="dept-select"
                            style={{ width: '100%', marginBottom: '1rem' }}
                        >
                            <option value="iot">IoT System & Information</option>
                            <option value="physiot">Industrial Physics & IoT</option>
                            <option value="continue">Continuing Program</option>
                        </select>

                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Existing Year:</label>
                        <select
                            value={currSelectedYear}
                            onChange={(e) => {
                                setCurrSelectedYear(e.target.value);
                                setNewYear(""); // clear new year if selecting existing
                            }}
                            className="dept-select"
                            style={{ width: '100%', marginBottom: '1rem' }}
                        >
                            <option value="">-- Select Year --</option>
                            {currYears.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>

                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>OR Enter New Year:</label>
                        <input
                            type="text"
                            value={newYear}
                            onChange={(e) => setNewYear(e.target.value)}
                            className="edit-input"
                            style={{ width: '100%' }}
                            placeholder="e.g. 2570"
                        />
                    </div>

                    <div style={{ flex: 2, minWidth: '400px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Curriculum PDF URL:</label>
                        <input
                            type="text"
                            value={currMetadata.pdfUrl}
                            onChange={(e) => setCurrMetadata({ ...currMetadata, pdfUrl: e.target.value })}
                            className="edit-input"
                            style={{ width: '100%', marginBottom: '1rem' }}
                            placeholder="e.g. Google Drive Link"
                        />

                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>PDF Label (Button Text):</label>
                        <input
                            type="text"
                            value={currMetadata.pdfLabel}
                            onChange={(e) => setCurrMetadata({ ...currMetadata, pdfLabel: e.target.value })}
                            className="edit-input"
                            style={{ width: '100%', marginBottom: '1.5rem' }}
                            placeholder="e.g. เล่มหลักสูตร... 2569"
                        />

                        <button
                            onClick={handleSaveCurrMetadata}
                            className="btn-save"
                            disabled={isSavingCurr}
                            style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
                        >
                            {isSavingCurr ? "Saving..." : "Save Curriculum Settings"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="admin-table-wrapper" style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
                <h3 className="admin-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Add New Subject</h3>
                <form onSubmit={handleNewCourseSubmit} style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Subject ID:</label>
                            <input type="text" value={newCourseForm.id} onChange={(e) => setNewCourseForm({ ...newCourseForm, id: e.target.value })} className="edit-input" placeholder="e.g. 01001101" required style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Name:</label>
                            <input type="text" value={newCourseForm.name} onChange={(e) => setNewCourseForm({ ...newCourseForm, name: e.target.value })} className="edit-input" placeholder="Subject Name" required style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Semester:</label>
                            <input type="number" value={newCourseForm.col} onChange={(e) => setNewCourseForm({ ...newCourseForm, col: parseInt(e.target.value) })} className="edit-input" required style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Order:</label>
                            <input type="number" value={newCourseForm.row} onChange={(e) => setNewCourseForm({ ...newCourseForm, row: parseInt(e.target.value) })} className="edit-input" required style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>M-Col:</label>
                            <input type="number" value={newCourseForm.mobile_col} onChange={(e) => setNewCourseForm({ ...newCourseForm, mobile_col: parseInt(e.target.value) })} className="edit-input" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>M-Row:</label>
                            <input type="number" value={newCourseForm.mobile_row} onChange={(e) => setNewCourseForm({ ...newCourseForm, mobile_row: parseInt(e.target.value) })} className="edit-input" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Plan Group (Optional):</label>
                            <input type="number" value={newCourseForm.plan_group} onChange={(e) => setNewCourseForm({ ...newCourseForm, plan_group: e.target.value })} className="edit-input" placeholder="1 or 2" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Plan Label (Optional):</label>
                            <input type="text" value={newCourseForm.plan_label} onChange={(e) => setNewCourseForm({ ...newCourseForm, plan_label: e.target.value })} className="edit-input" placeholder="PLAN 1..." style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Description:</label>
                        <textarea value={newCourseForm.description} onChange={(e) => setNewCourseForm({ ...newCourseForm, description: e.target.value })} className="edit-input" placeholder="Subject description..." style={{ width: '100%', height: '80px', marginBottom: '1.5rem' }} />
                    </div>
                    <button type="submit" className="btn-save" style={{ width: '100%', padding: '12px' }}>Add Subject to {currProgram.toUpperCase()} {currSelectedYear}</button>
                </form>

                <h3 className="admin-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Courses List ({currSelectedYear})</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th style={{ width: '60px' }}>Semester</th>
                                <th style={{ width: '60px' }}>Order</th>
                                <th style={{ width: '60px' }}>M-Col</th>
                                <th style={{ width: '60px' }}>M-Row</th>
                                <th style={{ width: '60px' }}>Plan Grp</th>
                                <th>Plan Label</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currCourses.map(c => (
                                <tr key={c.id}>
                                    {editingCourseId === c.id ? (
                                        <>
                                            <td>{c.id}</td>
                                            <td><input type="text" value={editCourseForm.name} onChange={(e) => setEditCourseForm({ ...editCourseForm, name: e.target.value })} className="edit-input" /></td>
                                            <td><textarea value={editCourseForm.description || ""} onChange={(e) => setEditCourseForm({ ...editCourseForm, description: e.target.value })} className="edit-input" style={{ width: '200px', height: '60px' }} /></td>
                                            <td><input type="number" value={editCourseForm.col} onChange={(e) => setEditCourseForm({ ...editCourseForm, col: parseInt(e.target.value) })} className="edit-input" style={{ width: '50px' }} /></td>
                                            <td><input type="number" value={editCourseForm.row} onChange={(e) => setEditCourseForm({ ...editCourseForm, row: parseInt(e.target.value) })} className="edit-input" style={{ width: '50px' }} /></td>
                                            <td><input type="number" value={editCourseForm.mobileCol || editCourseForm.mobile_col || ""} onChange={(e) => setEditCourseForm({ ...editCourseForm, mobile_col: parseInt(e.target.value) })} className="edit-input" style={{ width: '50px' }} /></td>
                                            <td><input type="number" value={editCourseForm.mobileRow || editCourseForm.mobile_row || ""} onChange={(e) => setEditCourseForm({ ...editCourseForm, mobile_row: parseInt(e.target.value) })} className="edit-input" style={{ width: '50px' }} /></td>
                                            <td><input type="number" value={editCourseForm.planGroup === null ? (editCourseForm.plan_group === null ? "" : editCourseForm.plan_group) : editCourseForm.planGroup} onChange={(e) => setEditCourseForm({ ...editCourseForm, plan_group: e.target.value ? parseInt(e.target.value) : null })} className="edit-input" style={{ width: '50px' }} /></td>
                                            <td><input type="text" value={editCourseForm.planLabel || editCourseForm.plan_label || ""} onChange={(e) => setEditCourseForm({ ...editCourseForm, plan_label: e.target.value })} className="edit-input" /></td>
                                            <td className="actions-cell">
                                                <button onClick={() => handleCourseSaveClick(c.id)} className="btn-save">Save</button>
                                                <button onClick={() => setEditingCourseId(null)} className="btn-cancel">Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{c.id}</td>
                                            <td>{c.name}</td>
                                            <td><div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.description}>{c.description || "-"}</div></td>
                                            <td>{c.col}</td>
                                            <td>{c.row}</td>
                                            <td>{c.mobileCol || c.mobile_col || "-"}</td>
                                            <td>{c.mobileRow || c.mobile_row || "-"}</td>
                                            <td>{c.planGroup ?? c.plan_group ?? "-"}</td>
                                            <td><div style={{ whiteSpace: 'pre-line', fontSize: '11px' }}>{c.planLabel || c.plan_label || "-"}</div></td>
                                            <td className="actions-cell">
                                                <button onClick={() => handleCourseEditClick(c)} className="btn-edit">Edit</button>
                                                <button onClick={() => handleCourseDeleteClick(c.id)} className="btn-cancel" style={{ marginLeft: '0.5rem' }}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="admin-table-wrapper" style={{ marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1 className="admin-title" style={{ marginTop: '2rem' }}>Important Dates</h1>

                <form onSubmit={handleNewDateSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem 2rem', background: '#1e1e1e', borderRadius: '8px' }}>
                    <input type="date" name="date" value={newDateForm.date} onChange={handleNewDateChange} className="edit-input" required />
                    <input type="text" name="event_text" value={newDateForm.event_text} onChange={handleNewDateChange} className="edit-input" placeholder="Event Name" required style={{ flex: 1 }} />
                    <button type="submit" className="btn-save">Add Date</button>
                </form>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Event Text</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dates.map((d) => (
                            <tr key={d.id}>
                                {editingDateId === d.id ? (
                                    <>
                                        <td><input type="date" name="date" value={editDateForm.date} onChange={handleDateChange} className="edit-input" /></td>
                                        <td><input type="text" name="event_text" value={editDateForm.event_text} onChange={handleDateChange} className="edit-input" /></td>
                                        <td className="actions-cell">
                                            <button onClick={() => handleDateSaveClick(d.id)} className="btn-save">Save</button>
                                            <button onClick={handleDateCancelClick} className="btn-cancel">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{d.date}</td>
                                        <td>{d.event_text}</td>
                                        <td className="actions-cell">
                                            <button onClick={() => handleDateEditClick(d)} className="btn-edit">Edit</button>
                                            <button onClick={() => handleDateDeleteClick(d.id)} className="btn-cancel">Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}