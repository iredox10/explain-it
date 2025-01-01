import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { path } from "../../utils/path";
import FormInput from "../../components/FormInput";
import FormBtn from "../../components/FormBtn";
import Form from "../../components/Form";
import { FaEdit, FaEye, FaPlus, FaTrash, FaTrashAlt } from "react-icons/fa";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

const AdminCategories = () => {
  const [categories, setCategories] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [about, setAbout] = useState("");
  const [priority, setPriority] = useState();
  const [categoryId, setCategoryId] = useState();
  const [model, setModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios(`${path}/get-categories`);
      setCategories(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !about) return;
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    try {
      const res = await axios.post(
        `${path}/add-category`,
        {
          name,
          about,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchCategories();
      setModel(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showEditModel = async (category) => {
    try {
      const res = await axios.get(`${path}/get-category/${category}`);
      console.log(res.data);
      if (res.status == 200) {
        setEditModel(true);
        setLoading(true);
        setTimeout(() => {
          setName(res.data.name);
          setSlug(res.data.slug);
          setAbout(res.data.about);
          setPriority(res.data.priority);
          setCategoryId(res.data._id);
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showDeleteModel = async (slug) => {
    console.log(slug)
    try {
      const res = await axios.get(`${path}/get-category/${slug}`);
      console.log(res.data);
      if (res.status == 200) {
        setDeleteModel(true);
        setLoading(true);
        setTimeout(() => {
          setName(res.data.name);
          setSlug(res.data.slug);
          setAbout(res.data.about);
          setPriority(res.data.priority);
          setCategoryId(res.data._id);
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (category) => {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    console.log(category)
    try {
      const res = await axios.delete(`${path}/delete-category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        setDeleteModel(false);
        await fetchCategories();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (e, category) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    try {
      const res = await axios.patch(
        `${path}/edit-category/${catogery}`,
        {
          name,
          about,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 201) {
        setEditModel(false);
        await fetchCategories();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="">
      <Header />

      {categories && (
        <Card
          categories={categories}
          model={showEditModel}
          deleteModel={showDeleteModel}
        ></Card>
      )}

      {model && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
            <Form
              onsubmit={handleSubmit}
              title="Add New Category"
              subtitle="Create a new category for articles"
              close={() => setModel(false)}
            >
              <div className="space-y-4">
                <FormInput
                  type="text"
                  label="Category Name"
                  labelFor="name"
                  name="name"
                  placeholder="Enter category name"
                  onchange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-50"
                />
                <FormInput
                  type="text"
                  label="Description" 
                  labelFor="about"
                  name="about"
                  placeholder="Enter category description"
                  onchange={(e) => setAbout(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-50"
                />
                <FormInput
                  type="number"
                  label="Priority Level"
                  labelFor="priority"
                  name="priority"
                  placeholder="Enter priority (1-10)"
                  min="1"
                  max="10"
                  onchange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-50"
                />
                <FormBtn 
                  text="Create Category"
                  className="w-full bg-primary-color text-white py-2 px-4 rounded-md hover:bg-primary-color/90 transition-colors"
                />
              </div>
            </Form>
          </div>
        </div>
      )}

      {editModel && (
        <div className="absolute left-[50%] translate-x-[-50%] w-full bg-secondary-color/60 top-0 bottom-0 ">
          <div className="flex place-content-center my-[7rem]">
            {loading ? (
              "loading"
            ) : (
              <Form
                onsubmit={(e) => handleEdit(e, categoryId)}
                title={name}
                subtitle={`Edit ${name}`}
                close={() => setEditModel(false)}
              >
                <FormInput
                  type={"text"}
                  label={"name"}
                  labelFor={"name"}
                  name={"name"}
                  value={name}
                  onchange={(e) => setName(e.target.value)}
                />
                <FormInput
                  type={"text"}
                  label={"about"}
                  labelFor={"about"}
                  name={"about"}
                  value={about}
                  onchange={(e) => setAbout(e.target.value)}
                />
                <FormInput
                  type={"number"}
                  label={"priority"}
                  labelFor={"priority"}
                  name={"priority"}
                  value={priority}
                  onchange={(e) => setPriority(e.target.value)}
                />
                <FormBtn text={"edit category"} />
              </Form>
            )}
          </div>
        </div>
      )}

      {deleteModel && (
        <div className="absolute left-[50%] translate-x-[-50%] w-full bg-secondary-color/60 top-0 bottom-0 ">
          {loading ? (
            "loading"
          ) : (
            <div className="flex place-content-center my-[7rem]   ">
              <div className=" border-2 border-primary-color">
                <h1 className="bg-primary-color p-5 capitalize text-white">
                  are you sure you want to delete {name}
                </h1>
                <div className="flex justify-between p-9">
                  <button onClick={() => setDeleteModel(false)}>No</button>
                  <button onClick={() => handleDelete(slug)}>Yes</button>
                </div>
              </div>{" "}
            </div>
          )}
        </div>
      )}
      <button
        className="absolute right-4 bottom-5 top-5 bg-primary-color p-5 rounded-full text-white"
        onClick={() => setModel(!model)}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AdminCategories;
