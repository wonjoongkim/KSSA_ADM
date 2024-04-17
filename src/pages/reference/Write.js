/* eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FloatButton, Breadcrumb, Spin, Card, Row, Col, DatePicker, Input, Modal, Upload, Space, Button, Radio, Divider } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, EditOutlined, InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFileDeleteMutation, useFileUploadMutation } from '../../hooks/api/FileManagement/FileManagement';
import { useBoardInsertMutation, useBoardUpdateMutation } from '../../hooks/api/BoardManagement/BoardManagement';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';

import { useDropzone } from 'react-dropzone';

export const Write = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [boardProp, setBoardProp] = useState(null); // 타겟 타이틀 명
    const [flagProp, setFlagProp] = useState(null); // 타겟 게시판 명
    const [titleProp, setTitleProp] = useState(null); // 타겟 게시판 타이틀
    const [formProp, setFormProp] = useState(null); // 타겟 게시판 등록/수정
    const editorRef = useRef(null);
    const [heightSize, setHeightSize] = useState(window.innerHeight);

    const [itemContainer, setItemContainer] = useState(null); // 항목 컨테이너
    const [fileContainer, setFileContainer] = useState(null); // 파일 컨테이너
    const [command, setCommand] = useState('false'); // 파일 업로드 여부
    const [uploadedFiles, setUploadedFiles] = useState([]); // 파일
    const [selectedFile, setselectedFile] = useState([]);

    //=================================================================
    // Board 등록 Start
    const [BoardInsertApi] = useBoardInsertMutation();
    const handel_BoardInsert_Api = async () => {
        const UploadResponse = await BoardInsertApi({
            Board_Type: flagProp,
            Subject: itemContainer?.Subject,
            Contents: itemContainer?.Contents,
            FileKey: itemContainer?.FileKey,
            InDate: itemContainer?.InDate
        });
        UploadResponse?.data?.RET_CODE === '0000'
            ? Modal.success({
                  content: '등록 완료',
                  //   style: { top: 320 }
                  onOk() {
                      Lists();
                      //       //   form.resetFields();
                      //       //   props.SaveClose();
                  }
              })
            : Modal.error({
                  content: '등록 오류',
                  style: { top: 320 },
                  onOk() {}
              });
    };
    // Board 등록 End
    //=================================================================

    // 게시물 업데이트 Start
    const [BoardUpdateApi] = useBoardUpdateMutation();
    // 게시물 업데이트 End

    //=================================================================
    // 파일 업로드 처리 Start
    const [FileUpload] = useFileUploadMutation();
    const handelFileUpload = async (filesToUpload) => {
        let formData = new FormData();
        Object.values(filesToUpload).forEach((fileData) => {
            formData.append('files', fileData);
        });
        const FileUploadResponse = await FileUpload(formData);
        FileUploadResponse?.data?.RET_CODE === '0000'
            ? setItemContainer({ ...itemContainer, FileKey: FileUploadResponse?.data?.RET_DATA.FileKey })
            : Modal.error({
                  content: FileUploadResponse?.data?.RET_DESC,
                  style: { top: 320 }
              });
    };
    // 파일 업로드 처리 End
    //=================================================================

    //=================================================================
    // 파일 삭제 처리 Start
    const [FileDelete] = useFileDeleteMutation();
    const handelFileDelete = async (FileIdx, FileNm) => {
        const FileDeleteResponse = await FileDelete({
            FileIdx: FileIdx,
            FileNm: FileNm
        });
        FileDeleteResponse?.data?.RET_CODE === '0000'
            ? setItemContainer({ ...itemContainer, FileKey: FileDeleteResponse?.data?.RET_DATA.FileKey })
            : Modal.error({
                  content: '파일 삭제 오류',
                  style: { top: 320 },
                  onOk() {}
              });
    };
    // 파일 삭제 처리 End
    //=================================================================

    //=================================================================
    // 파일 업로드 Start
    const handleDrop = (acceptedFiles) => {
        const remainingSlots = 10 - uploadedFiles.length;
        const filesToUpload = acceptedFiles.slice(0, remainingSlots);
        filesToUpload.forEach((file) => {
            // 파일 정보 및 base64 변환
            const reader = new FileReader();
            reader.onload = () => {
                const uploadedFile = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    base64Image: reader.result,
                    localPath: file.path
                };
                // 업로드된 이미지 추가
                setUploadedFiles((prevImages) => [...prevImages, uploadedFile]);
            };
            reader.readAsDataURL(file);
        });
        setselectedFile(filesToUpload);
        setCommand('true');
        handelFileUpload(filesToUpload);
    };
    const {
        getRootProps: getRootProps,
        getInputProps: getInputProps,
        isDragActive: isDragActive
    } = useDropzone({
        onDrop: handleDrop
    });

    // 이미지 삭제
    const handleImageDelete = (index, FileIdx, File_Nm) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles.splice(index, 1);
        setUploadedFiles(updatedFiles);
        handelFileDelete(FileIdx, File_Nm); // 업로드 파일 삭제
    };
    // 이미지 업로드 End
    //=================================================================

    // 등록일자
    const onChange = (date, dateString) => {
        setItemContainer({ ...itemContainer, InDate: dateString });
    };

    const editor_onChange = (html) => {
        // props.editor_onChange(html);
        console.log(html);
    };

    const handleResize = () => {
        setHeightSize(window.innerHeight);
    };

    // 추가 Start
    const Writes = () => {
        handel_BoardInsert_Api();
    };
    // 추가 End

    // 목록 Start
    const Lists = () => {
        navigate('/reference/List', { state: { board: boardProp, flag: flagProp, title: titleProp } });
    };
    // 목록 End

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        const timerId = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(timerId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setBoardProp(location.state.board);
        setFlagProp(location.state.flag);
        setTitleProp(location.state.title);
        setFormProp(location.state.form);
    }, [location.state]);

    return (
        <>
            <MainCard
                title={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    href: '/',
                                    title: <HomeOutlined />
                                },
                                {
                                    title: boardProp
                                },
                                {
                                    title: titleProp
                                }
                            ]}
                        />
                    </>
                }
            ></MainCard>
            <Spin tip="Loading..." spinning={loading}>
                <Card title={formProp === 'Write' ? '등록' : '수정'} style={{ marginTop: '30px' }}>
                    <Row gutter={[16, 32]}>
                        <Col span={24} style={{ fontSize: '15px' }}>
                            <DatePicker placeholder="등록일" onChange={onChange} style={{ height: '55px', width: '100%' }} />
                        </Col>

                        <Col span={24} style={{ fontSize: '18px', fontWeight: '600' }}>
                            <Input
                                size="large"
                                placeholder="제목"
                                prefix={<EditOutlined />}
                                allowClear
                                enterButton="Search"
                                style={{ height: '55px' }}
                                onChange={(e) => setItemContainer({ ...itemContainer, Subject: e.target.value })}
                            />
                        </Col>

                        <Col span={24} style={{ fontSize: '15px' }}>
                            <Editor
                                ref={editorRef}
                                initialValue={' '}
                                initialEditType="wysiwyg"
                                hideModeSwitch={false}
                                width="100%"
                                height="450px"
                                usageStatistics={false}
                                useCommandShortcut={true}
                                name="Contents"
                                // onChange={() => editor_onChange(editorRef.current?.getInstance().getHTML())}
                                onChange={() =>
                                    setItemContainer({
                                        ...itemContainer,
                                        Contents: editorRef.current?.getInstance().getHTML()
                                    })
                                }
                                plugins={[colorSyntax]}
                                language="ko-KR"
                            />
                        </Col>

                        <Col span={24} style={{ fontSize: '15px' }}>
                            <Space wrap>
                                <Button
                                    {...getRootProps()}
                                    className={`dropzone ${isDragActive ? 'active' : ''}`}
                                    style={{ width: '100%', height: '150px' }}
                                    size="large"
                                    // disabled={uploadedFiles?.length >= 4}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined style={{ fontSize: '28px' }} />
                                    </p>
                                    <input {...getInputProps()} type="file" />
                                    {isDragActive ? (
                                        <p>업로드하려면 영역을 클릭하거나 드래그하세요</p>
                                    ) : (
                                        <>
                                            <p className="ant-upload-text">업로드하려면 영역을 클릭하거나 드래그하세요</p>
                                        </>
                                    )}
                                </Button>
                            </Space>
                            {uploadedFiles.length > 0 ? (
                                <>
                                    <Divider />
                                    <Space>
                                        <Row>
                                            {uploadedFiles?.map((File, index) => (
                                                <Col
                                                    span={24}
                                                    key={index}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'start',
                                                        alignItems: 'center',
                                                        borderRadius: '5px',
                                                        padding: '3px'
                                                    }}
                                                >
                                                    <Button
                                                        danger
                                                        name="Quest_answer"
                                                        type="primary"
                                                        icon={<DeleteOutlined />}
                                                        // onClick={() => handleImageDelete(index, itemContainer.FileIdx, itemContainer.FilePath)}
                                                        onClick={() =>
                                                            handleImageDelete(index, '48', '8e62245f-d8fe-46d3-90eb-91e36dda792d.jpg')
                                                        }
                                                        style={{ marginRight: '6px' }}
                                                    >
                                                        삭제
                                                    </Button>
                                                    {File.name}
                                                </Col>
                                            ))}
                                        </Row>
                                    </Space>
                                </>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                    <Divider />
                    <Row gutter={[16, 0]} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Col span={2}>
                            <Button
                                icon={<EditOutlined />}
                                onClick={(e) => Writes()}
                                type="primary"
                                style={{ height: '45px', width: '80px' }}
                            >
                                등록
                            </Button>
                        </Col>
                        <Col span={2}>
                            <Button
                                icon={<EditOutlined />}
                                onClick={(e) => Lists()}
                                type="primary"
                                style={{ backgroundColor: '#70AD47', height: '45px', width: '80px' }}
                            >
                                목록
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Spin>
            <FloatButton.BackTop />
        </>
    );
};
