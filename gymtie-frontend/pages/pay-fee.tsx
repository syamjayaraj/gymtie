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
import PaymentForm from "../components/payment-form";
import { addPayment } from "../services/paymentApi";
import { useRouter } from "next/router";
export default function PayFee() {
    const router = useRouter()
    const [showAddMemberModal, setShowAddMemberModal] = useState(false)
    const [membersForRender, setMembersForRender] = useState([])

    const [members, setMembers] = useState([])
    const [memberToBeEdited, setMemberToBeEdited] = useState({})


    const handleEditPaymentModal = async (param) => {

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
                        onClick={() => handleEditPaymentModal(members[index])}>

                        <button
                            className="btn btn-secondary btn-user btn-block"
                            type="submit"
                        >
                            Pay Fee
                        </button>
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

    const handleAddPayment = async (values, setSubmitting) => {
        setSubmitting(true);
        const res: any = await addPayment(values)
        if (res?.status === 200) {
            toast.success('Payment Added Successfully');
            setShowAddMemberModal(false)
            router?.push("/payments")
        } else {
            setShowAddMemberModal(false)
            toast.error('Error Adding Payment');
        }
        setSubmitting(false);
    }

    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <PaymentForm
                    showModal={showAddMemberModal}
                    setShowModal={setShowAddMemberModal}
                    handleAddPayment={handleAddPayment}
                    handleEditPayment={null}
                    initialValuesProps={memberToBeEdited}
                    type="add"
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
                                <h1 className="h3 mb-2 text-gray-800">Fee Payment</h1>
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