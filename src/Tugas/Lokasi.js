import React, { Component } from "react";
import axios from "axios";
import { Modal } from "antd";
import "antd/dist/antd.css";
import styled from 'styled-components';
import "./Index.css";


export default class Lokasi extends Component {

	constructor(props) {
		super(props);
			this.state = {
			lokasi: [],
			visible: false,
			id: "",
			propinsi: "",
			kota: "",
			kecamatan: "",
			lat: "",
			lon: "",
		};
	}

	handleButton = (id) => {
		alert(id);
	};

	handleTambahLokasi = () => {
		this.setState({
			visible: true,
		});
	};

	handleid = (e) => {
		this.setState({
			id: e.target.value,
		});
		console.log(this.state.id);
	};

	handlepropinsi = (e) => {
		this.setState({
			propinsi: e.target.value,
		});
		console.log(this.state.propinsi);
	};

	handlekota = (e) => {
		this.setState({
			kota: e.target.value,
		});
		console.log(this.state.kota);
	};

	handlekecamatan = (e) => {
		this.setState({
			kecamatan: e.target.value,
		});
		console.log(this.state.kecamatan);
	};

	handlelat = (e) => {
		this.setState({
			lat: e.target.value,
		});
		console.log(this.state.lat);
	};

	handlelon = (e) => {
		this.setState({
			lon: e.target.value,
		});
		console.log(this.state.lon);
	};

	handleSubmit = () => {
		if (
			this.state.id !== "" &&
			this.state.propinsi !== "" &&
			this.state.kota !== "" &&
			this.state.kecamatan !== "" &&
			this.state.lat !== "" &&
			!this.state.lon !== ""
			) {
		axios({
			method: "post",
			url: "https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json/add",
			headers: {
			accept: "*/*",
			},
			data: {
			id: this.state.id,
			propinsi: this.state.propinsi,
			kota: this.state.kota,
			kecamatan: this.state.kecamatan,
			lat: this.state.lat,
			lon: this.state.lon,
			},
		})
		.then((data) => {
		alert("berhasil menambahkan");
		window.location.reload();
		})
	.catch((error) => {
	alert("gagal lur");
	});
	} else {
		alert("pastikan semua kolom terisi");
	}
	};

	componentDidMount() {
		axios({
		method: "get",
		url: "https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json",
		headers: {
		accept: "*/*",
		},
		})
		.then((data) => {
		console.log(data.data);
		this.setState({
		lokasi: data.data,
		});
		})
		.catch((error) => {
		console.log(error);
		});
	}

	render() {
		return (
			<div className="Main">
					<center>
						<h1 className="title">TUGAS RSBK MODUL 5 KEL 15 </h1>
						<h2 className="title">Koordinat Wilayah di Indonesia</h2>
					</center>
				<div className="card-body">
					<center>
						<button className="Button" onClick={this.handleTambahLokasi}>Tambah</button>
					</center>
					<Modal
						title="Tambah Lokasi"
						centered
						visible={this.state.visible}
						onOk={this.handleSubmit}
						onCancel={() => this.setState({ visible: false })}
						width={500}
					>
						<div style={{ textAlign: "center" }}>
							<p>Id : </p>{" "}
								<input
								type="text"
								placeholder="id"
								onChange={this.handleid}
								/>
							<br />
							<p>Propinsi : </p>{" "}
								<input 
								type="text" 
								placeholder="propinsi" 
								onChange={this.handlepropinsi} />
							<br />
							<p>Kota : </p>{" "}
								<input
								type="text"
								placeholder="kota"
								onChange={this.handlekota}
								/>
							<br />
							<p>Kecamatan : </p>{" "}
								<input
								type="text"
								placeholder="kecamatan"
								onChange={this.handlekecamatan}
								/>
							<br />
							<p>Latitude : </p>{" "}
								<input 
								type="text" 
								placeholder="lat" 
								onChange={this.handlelat} />
							<br />
							<p>Longitude : </p>{" "}
								<input
								type="text"
								placeholder="lon"
								onChange={this.handlelon}
								/>
							<br />
						</div>
					</Modal>

					{this.state.lokasi.map((results, index) => {
						return (
						<div className="card" key={results.id}>
							<div className="card-body">
								<h5 className="card-title">
								Id &emsp; &emsp; &emsp; : {results.id} <br/>
								Provinsi &nbsp; &nbsp; : {results.propinsi} <br/>
								Kota &emsp; &emsp; : {results.kota} <br/>
								Kec &emsp; &emsp; &nbsp; : {results.kecamatan}
								</h5>
							</div>
							<p>
								<button
									className="Button"
									onClick={() => this.handleButton(results.lat)}
									>
									{" "}
									Latitude
								</button>
								<button
									className="Button" 
									onClick={() => this.handleButton(results.lon)}
									>
									{" "}
									Longitude
								</button>
							</p>
						</div>
						);
					})}
				</div>
			</div>
		);
	}
}

