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
import { memberTableColumns } from "../const/member-table";

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
        columns: memberTableColumns,
        rows: membersForRender
    };


    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <MemberForm
                    showModal={showAddMemberModal}
                    setShowModal={setShowAddMemberModal}
                    handleAddMember={handleAddMember}
                    initialValuesProps={memberToBeEdited}
                />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Navbar />
                        <div className="container-fluid">
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
                    </div>
                    <Footer />
                </div>
            </div >
        </>
    )
}