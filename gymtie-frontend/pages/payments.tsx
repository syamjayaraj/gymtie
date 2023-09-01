import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { MDBDataTable } from "mdbreact";
import { addPayment, deletePayment, listPayments } from "../services/paymentApi"
import { confirmAlert } from 'react-confirm-alert';
import MemberForm from "../components/payment-form";
import { toast } from "react-toastify";
import moment from "moment"
import { paymentTableColumns } from "../const/payment-table";

export default function Payments() {

    const [showAddMemberModal, setShowAddMemberModal] = useState(false)
    const [paymentsForRender, setMembersForRender] = useState([])

    const [payments, setMembers] = useState([])
    const [paymentToBeEdited, setMemberToBeEdited] = useState({})




    const handleDeleteMember = async (paymentId) => {
        const res: any = await deletePayment(paymentId)
        if (res?.status === 200) {
            toast.success('Payment Deleted Successfully');
            var paymentIndex = payments.findIndex(function (o) {
                return o._id === paymentId;
            });
            if (paymentIndex !== -1) {
                setMembers(payments.filter((item) => item._id != paymentId));
            }
        }
    }

    const handleEditMemberModal = async (param) => {
        setMemberToBeEdited(param)
        setShowAddMemberModal(true)
    }

    useEffect(() => {
        const handleListMembers = async () => {
            const res: any = await listPayments()
            if (res?.status === 200) {
                setMembers(res?.data)
            } else {

            }
        }
        handleListMembers()
    }, [])

    useEffect(() => {
        let paymentsArray = JSON.parse(JSON.stringify(payments));
        let paymentsData = [];
        paymentsArray.map((item, index) => {
            item.id = (
                <div>{item?._id}</div>
            );
            item.name = (
                <div>{item?.member?.name}</div>
            );
            item.phoneNumber = (
                <div>{item?.member?.phoneNumber}</div>
            );
            item.paymentDate = (
                <div>{moment(item?.paymentDate).format("Do MMM YYYY")}</div>
            );
            item.amount = (
                <div>{item?.amount}</div>
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
                        onClick={() => handleEditMemberModal(payments[index])}>
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
                                message: 'Are you sure you want to delete this payment?',
                                closeOnEscape: true,
                                closeOnClickOutside: true,
                                buttons: [
                                    {
                                        label: 'Yes',
                                        onClick: () =>
                                            handleDeleteMember(payments[index]._id)
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
            paymentsData.push(item);
        });
        setMembersForRender(paymentsData);
    }, [payments]);

    const data = {
        columns: paymentTableColumns,
        rows: paymentsForRender
    };


    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Navbar />
                        <div className="container-fluid">
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