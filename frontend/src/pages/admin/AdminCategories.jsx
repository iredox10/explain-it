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

  const showEditModel = async (id) => {
    try {
      const res = await axios.get(`${path}/get-category/${id}`);
      console.log(res.data);
      if (res.status == 200) {
        setEditModel(true);
        setLoading(true);
        setTimeout(() => {
          setName(res.data.name);
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
  const showDeleteModel = async (id) => {
    try {
      const res = await axios.get(`${path}/get-category/${id}`);
      console.log(res.data);
      if (res.status == 200) {
        setDeleteModel(true);
        setLoading(true);
        setTimeout(() => {
          setName(res.data.name);
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
  const handleDelete = async (id) => {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    try {
      const res = await axios.delete(
        `${path}/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        setDeleteModel(false);
        await fetchCategories();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };


  const handleEdit = async (e, id) => {
    e.preventDefault()
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    try {
      const res = await axios.patch(
        `${path}/edit-category/${id}`,
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
        <div className="absolute left-[50%] translate-x-[-50%] w-full bg-secondary-color/60 top-0 bottom-0 ">
          <div className="flex place-content-center my-[7rem]">
            <Form
              onsubmit={handleSubmit}
              title={"Category"}
              subtitle={"add Category"}
              close={() => setModel(false)}
            >
              <FormInput
                type={"text"}
                label={"name"}
                labelFor={"name"}
                name={"name"}
                onchange={(e) => setName(e.target.value)}
              />
              <FormInput
                type={"text"}
                label={"about"}
                labelFor={"about"}
                name={"about"}
                onchange={(e) => setAbout(e.target.value)}
              />
              <FormInput
                type={"number"}
                label={"priority"}
                labelFor={"priority"}
                name={"priority"}
                onchange={(e) => setPriority(e.target.value)}
              />
              <FormBtn text={"add category"} />
            </Form>
          </div>{" "}
        </div>
      )}

      <button
        className="absolute right-4 bottom-5 bg-primary-color p-5 rounded-full text-white"
        onClick={() => setModel(!model)}
      >
        <FaPlus />
      </button>
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
                  <button onClick={() => handleDelete(categoryId)}>Yes</button>
                </div>
              </div>{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
