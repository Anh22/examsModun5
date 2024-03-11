import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
            setList(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://restcountries.com/v3.1/all/${id}`);
            fetchPosts();
            alert("Delete successful");
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleSort = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
    };

    const sortedList = list.slice().sort((a, b) => {
        const cityA = a.name.common.toUpperCase();
        const cityB = b.name.common.toUpperCase();
        if (sortOrder === "asc") {
            return cityA < cityB ? -1 : cityA > cityB ? 1 : 0;
        } else {
            return cityA > cityB ? -1 : cityA < cityB ? 1 : 0;
        }
    });

    const filteredList = sortedList.filter((item) => {
        return item.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.official.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <h1>Post List</h1>
            <input
                type="text"
                placeholder="Search by name or flag"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSort}>
                Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Official Name</th>
                            <th scope="col">Flags</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredList.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name.common}</td>
                                <td>{item.name.official}</td>
                                <td><img src={item.flags.svg} alt={item.name.common} style={{width:'200px'}}/></td>
                                <td>
                                    <button
                                        className="btn btn-danger mr-2"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/edit-posts/${item.id}`} className="btn btn-secondary">Edit</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link to="/">Back</Link>
        </>
    );
}
