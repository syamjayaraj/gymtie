import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { MDBDataTable } from "mdbreact";
import { addMember, deleteMember, listMembers } from "../services/memberApi"
import { confirmAlert } from 'react-confirm-alert';
import MemberForm from "../components/member-form";
import { toast } from "react-toastify";
import moment from "moment"

export default function Members() {

    const [showAddMemberModal, setShowAddMemberModal] = useState(false)
    const [membersForRender, setMembersForRender] = useState([])

    const [members, setMembers] = useState([])
    const [memberToBeEdited, setMemberToBeEdited] = useState({})


    const handleAddMemberModal = () => {
        setShowAddMemberModal(true)
    }

    const handleAddMember = async (values, setSubmitting) => {
        setSubmitting(true);
        const res: any = await addMember(values)
        if (res?.status === 200) {
            toast.success('Member Added Successfully');
            const newMembersList = [...members, res?.data?.data]
            console.log(newMembersList, "lorem")
            setMembers(newMembersList)
            setShowAddMemberModal(false)
        } else {
            setShowAddMemberModal(false)
        }
        setSubmitting(false);
    };

    const handleDeleteMember = async (memberId) => {
        const res: any = await deleteMember(memberId)
        if (res?.status === 200) {
            toast.success('Member Deleted Successfully');
            var memberIndex = members.findIndex(function (o) {
                return o._id === memberId;
            });
            if (memberIndex !== -1) {
                setMembers(members.filter((item) => item._id != memberId));
            }
        }
    }

    const handleEditMemberModal = async (param) => {
        setMemberToBeEdited(param)
        setShowAddMemberModal(true)
    }

    useEffect(() => {
        const handleListMembers = async () => {
            const res: any = await listMembers()
            if (res?.status === 200) {
                setMembers(res?.data)
            } else {

            }
        }
        handleListMembers()
    }, [])

    useEffect(() => {
        let membersArray = JSON.parse(JSON.stringify(members));
        let membersData = [];
        membersArray.map((item, index) => {
            item.id = (
                <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div>
            );
            item.joiningDate = (
                <div>{moment(item.joiningDate).format("Do MMM YYYY")}</div>
            );
            item.action = (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div
                        className="uil-trash-alt"
                        style={{
                            cursor: "pointer",
                            color: "#938af3",
                            fontSize: ".7em",
                            marginRight: ".5rem"
                        }}
                        onClick={() => handleEditMemberModal(members[index])}>
                        Edit
                    </div>
                    <div
                        className="uil-trash-alt"
                        style={{
                            cursor: "pointer",
                            color: "#fb6262",
                            fontSize: ".7em",

                        }}
                        onClick={() =>
                            confirmAlert({
                                title: '',
                                message: 'Are you sure you want to delete this member?',
                                closeOnEscape: true,
                                closeOnClickOutside: true,
                                buttons: [
                                    {
                                        label: 'Yes',
                                        onClick: () =>
                                            handleDeleteMember(members[index]._id)
                                    },
                                    {
                                        label: 'No',
                                        onClick: () => { }
                                    }
                                ]
                            })}>
                        Delete
                    </div>
                </div>
            );
            membersData.push(item);
        });
        setMembersForRender(membersData);
    }, [members]);

    const data = {
        columns: [
            {
                label: "Name",
                field: "name",
                sort: "asc",
                width: 150
            },
            {
                label: "Phone Number",
                field: "phoneNumber",
                sort: "asc",
                width: 100
            },
            {
                label: "Email",
                field: "email",
                sort: "asc",
                width: 100
            },
            {
                label: "Age",
                field: "age",
                sort: "asc",
                width: 50
            },
            {
                label: "Address",
                field: "address",
                sort: "asc",
                width: 250
            },
            {
                label: "City",
                field: "city",
                sort: "asc",
                width: 100
            },
            {
                label: "State",
                field: "state",
                sort: "asc",
                width: 100
            },
            {
                label: "Country",
                field: "country",
                sort: "asc",
                width: 100
            },
            {
                label: "PIN Code",
                field: "pincode",
                sort: "asc",
                width: 100
            },
            {
                label: "Joining date",
                field: "joiningDate",
                sort: "asc",
                width: 150
            },
            {
                label: "About",
                field: "about",
                sort: "asc",
                width: 200
            },
            {
                label: "Action",
                field: "action",
                width: 100,
            },
        ],
        rows: membersForRender
    };


    return (
        <>
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                {/* <!-- Sidebar --> */}
                <Sidebar />
                <MemberForm
                    showModal={showAddMemberModal}
                    setShowModal={setShowAddMemberModal}
                    handleAddMember={handleAddMember}
                    initialValuesProps={memberToBeEdited}
                />

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">


                    {/* <!-- Main Content --> */}
                    <div id="content">

                        {/* <!-- Topbar --> */}
                        <Navbar />
                        {/* <!-- End of Topbar --> */}

                        {/* <!-- Begin Page Content --> */}
                        <div className="container-fluid">

                            {/* <!-- Page Heading --> */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <h1 className="h3 mb-2 text-gray-800">Members</h1>
                                <div className="">
                                    <button type="button" className="btn btn-secondary btn-lg" style={{
                                        alignItems: "center",
                                        alignContent: "center",
                                        display: "flex",
                                        padding: "0rem 3rem",
                                        fontSize: "1.1rem"
                                    }}
                                        onClick={handleAddMemberModal}
                                    >Add</button>
                                </div>
                            </div>

                            {/* <!-- DataTales Example --> */}
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <MDBDataTable
                                            striped bordered hover data={data}
                                            paging={false}
                                            noBottomColumns={true}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    <Footer />
                    {/* <!-- End of Footer --> */}

                </div>
                {/* <!-- End of Content Wrapper --> */}
            </div >
        </>
    )
}