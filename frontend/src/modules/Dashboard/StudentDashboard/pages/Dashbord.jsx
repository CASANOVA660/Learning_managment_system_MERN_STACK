import React, { useState } from 'react';
import SideBar from '../components/sideBar'; // Adjust the import path
import BasicLineChart from "../../../../core/components/charts/BasicLineChart"; // Adjust the import path
import { Row, Col, Card, Dropdown } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import './Dashboard.css'; // Ensure you are importing your CSS

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="dashboard" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Row style={{ height: '100%' }}>
                <Col xs={isSidebarOpen ? 2 : 1} className="sidebar-col">
                    <SideBar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                </Col>

                <Col xs={isSidebarOpen ? 10 : 11} className="content-col">
                    {/* Search Bar and Profile in a Card */}
                    <Card className="mb-4 shadow-sm" style={{ border: 'none', height: '65px', padding: '10px', marginTop: '30px' }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <i className="bx bx-search bx-sm me-2"></i>
                                <input
                                    type="text"
                                    className="form-control border-0 shadow-none ps-2"
                                    placeholder="Search..."
                                    aria-label="Search"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            {/* User Profile Dropdown */}
                            <Dropdown>
                                <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="p-0">
                                    <div className="avatar avatar-online">
                                        <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Item>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-0">John Doe</h6>
                                                <small className="text-muted">Admin</small>
                                            </div>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#">
                                        <i className="bx bx-user bx-md me-3"></i>My Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        <i className="bx bx-cog bx-md me-3"></i>Settings
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        <span className="d-flex align-items-center">
                                            <i className="bx bx-credit-card bx-md me-3"></i>
                                            Billing Plan
                                            <span className="badge rounded-pill bg-danger ms-auto">4</span>
                                        </span>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="javascript:void(0);">
                                        <i className="bx bx-power-off bx-md me-3"></i>Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Body>
                    </Card>

                    {/* Congratulations Card */}
                    <div className="col-xxl-8 mb-4">
                        <Card>
                            <div className="d-flex align-items-start row">
                                <div className="col-sm-7">
                                    <Card.Body>
                                        <h5 className="card-title text-primary mb-3">Congratulations John! 🎉</h5>
                                        <p className="mb-6">You have done 72% more sales today.<br />Check your new badge in your profile.</p>
                                        <a href="javascript:;" className="btn btn-sm btn-outline-primary">View Badges</a>
                                    </Card.Body>
                                </div>
                                <div className="col-sm-5 text-center text-sm-left">
                                    <Card.Body className="pb-0 px-0 px-md-6">
                                        <img src="../assets/img/illustrations/man-with-laptop.png" height="175" className="scaleX-n1-rtl" alt="View Badge User" />
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Profit and Sales Cards */}
                    <div className="col-lg-4 col-md-4 order-1 mb-4">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-6 mb-6">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                            <div className="avatar flex-shrink-0">
                                                <img src="../assets/img/icons/unicons/chart-success.png" alt="chart success" className="rounded" />
                                            </div>
                                            <div className="dropdown">
                                                <button className="btn p-0" type="button" id="cardOpt3" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="bx bx-dots-vertical-rounded text-muted"></i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                                    <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                                    <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mb-1">Profit</p>
                                        <h4 className="card-title mb-3">$12,628</h4>
                                        <small className="text-success fw-medium"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-6 mb-6">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                            <div className="avatar flex-shrink-0">
                                                <img src="../assets/img/icons/unicons/wallet-info.png" alt="wallet info" className="rounded" />
                                            </div>
                                            <div className="dropdown">
                                                <button className="btn p-0" type="button" id="cardOpt6" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="bx bx-dots-vertical-rounded text-muted"></i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                                    <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                                    <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mb-1">Sales</p>
                                        <h4 className="card-title mb-3">$4,679</h4>
                                        <small className="text-success fw-medium"><i className="bx bx-up-arrow-alt"></i> +28.42%</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Chart Section */}
                    <div className="chart-card mb-4">
                        <h2>Dashboard Overview</h2>
                        <BasicLineChart />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
