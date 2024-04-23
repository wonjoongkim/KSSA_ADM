/* eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FloatButton, Breadcrumb, Spin, Card, Row, Col, DatePicker, Input, Modal, Tooltip, Space, Button, Switch, Divider } from 'antd';
import MainCard from 'components/MainCard';
import {
    HomeOutlined,
    EditOutlined,
    InboxOutlined,
    DeleteOutlined,
    FileDoneOutlined,
    DownloadOutlined,
    EyeOutlined,
    DeleteFilled,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import {
    useFileDeleteMutation,
    useFileUploadMutation,
    useFileDownLoadMutation,
    useFilePreViewMutation
} from '../../hooks/api/FileManagement/FileManagement';
import { useBoardInsertMutation, useBoardViewMutation, useBoardUpdateMutation } from '../../hooks/api/BoardManagement/BoardManagement';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';

import { useDropzone } from 'react-dropzone';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

export const Write = () => {
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    const { v4: uuidv4 } = require('uuid'); // UUID 생성을 위한 라이브러리
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [boardProp, setBoardProp] = useState(null); // 타겟 타이틀 명
    const [flagProp, setFlagProp] = useState(null); // 타겟 게시판 명
    const [titleProp, setTitleProp] = useState(null); // 타겟 게시판 타이틀
    const [formProp, setFormProp] = useState(null); // 타겟 게시판 등록/수정
    const [boardIdx, setBoardIdx] = useState(null); // 타겟 게시판 Idx

    const [FileKey, setFileKey] = useState(null); // 파일 Key 생성
    const editorRef = useRef(null);
    const [heightSize, setHeightSize] = useState(window.innerHeight);

    const [itemContainer, setItemContainer] = useState(null); // 항목 컨테이너
    const [fileContainer, setFileContainer] = useState(null); // 파일 컨테이너
    const [blobFilePaht, setBlobFilePaht] = useState(null); // 파일 Blob 파일경로

    // const [command, setCommand] = useState('false'); // 파일 업로드 여부
    const [uploadedFiles, setUploadedFiles] = useState([]); // 파일
    const [selectedFile, setSelectedFile] = useState([]);

    const DataOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

    //=================================================================
    // Board 등록 Start
    const [BoardInsertApi] = useBoardInsertMutation();
    const handel_BoardInsert_Api = async () => {
        const UploadResponse = await BoardInsertApi({
            Board_Type: flagProp,
            Subject: itemContainer?.Subject,
            Contents: itemContainer?.Contents,
            FileKey: FileKey,
            InDate: itemContainer?.InDate
        });
        UploadResponse?.data?.RET_CODE === '0000'
            ? Modal.success({
                  content: '등록 완료',
                  //   style: { top: 320 }
                  onOk() {
                      handelFileUpload(selectedFile);
                      Lists();
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

    //=================================================================
    // Board View Data Start
    const [BoardViewApi] = useBoardViewMutation();
    const handel_BoardView = async () => {
        const BoardViewResponse = await BoardViewApi({
            Board_Type: location.state.flag,
            Idx: location.state.Idx
        });
        if (BoardViewResponse?.data?.RET_CODE === '0000') {
            editorRef.current?.getInstance().setMarkdown(BoardViewResponse?.data?.RET_DATA?.result[0].Contents);
            setFileKey(BoardViewResponse?.data?.RET_DATA?.result[0].File_Key);
            setItemContainer({
                State: BoardViewResponse?.data?.RET_DATA?.result[0].State,
                Subject: BoardViewResponse?.data?.RET_DATA?.result[0].Subject,
                Date: BoardViewResponse?.data?.RET_DATA?.result[0].InDate,
                Contents: BoardViewResponse?.data?.RET_DATA?.result[0].Contents,
                FileKey: FileKey
            });
            setFileContainer(BoardViewResponse?.data?.RET_DATA?.file_result);
            setBlobFilePaht(BoardViewResponse?.data?.RET_DATA?.blobdata);
        } else {
            Modal.error({
                content: '해당 게시물 오류',
                style: { top: 320 },
                onOk() {}
            });
        }
    };
    // Board View Data End
    //=================================================================

    //=================================================================
    // Board 수정 Start
    const [BoardUpdateApi] = useBoardUpdateMutation();
    const handel_BoardUpdate = async () => {
        const BoardUpdateResponse = await BoardUpdateApi({
            Board_Type: flagProp,
            Subject: itemContainer?.Subject,
            Contents: itemContainer?.Contents,
            // InDate: itemContainer?.Date,
            State: itemContainer?.State,
            Idx: boardIdx
        });
        BoardUpdateResponse?.data?.RET_CODE === '0000'
            ? Modal.success({
                  content: '수정 완료',
                  onOk() {
                      handelFileUpload(selectedFile);
                      Lists();
                  }
              })
            : Modal.error({
                  content: '등록 오류',
                  style: { top: 320 },
                  onOk() {}
              });
    };
    // Board 수정 Data End
    //=================================================================

    //=================================================================
    // 파일 다운로드 Start
    const [FileDownLoadApi] = useFileDownLoadMutation();
    const handel_FileDownLoad = async (FilePath, FileName) => {
        // const FileDownLoadResponse = await FileDownLoadApi({
        //     fileName: fileName
        // });

        // const url = window.URL.createObjectURL(new Blob([FilePath]));
        const url = FilePath;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', FileName);
        document.body.appendChild(link);
        link.click();
    };
    // 파일 다운로드 End
    //=================================================================

    //=================================================================
    // 파일 미리보기 Start
    const [FilePreViewApi] = useFilePreViewMutation();
    const handel_FilePreView = async (FilePath) => {
        // console.log(FilePath);
        const url = FilePath;
        const windowFeatures = 'max-width=900,top=100,left=100'; // 새 창의 속성 설정
        window.open(url, 'Download', windowFeatures);
    };

    // 파일 미리보기 End
    //=================================================================

    //=================================================================
    // 파일 업로드 처리 Start
    const [FileUpload] = useFileUploadMutation();
    const handelFileUpload = async (filesToUpload) => {
        let formData = new FormData();
        Object.values(filesToUpload).forEach((fileData) => {
            formData.append('files', fileData, encodeURIComponent(fileData.name));
        });
        formData.append('FileKey', FileKey);
        const FileUploadResponse = await FileUpload(formData);
        FileUploadResponse?.data?.RET_CODE === '0000'
            ? setFileContainer(FileUploadResponse?.data?.RET_DATA)
            : Modal.error({
                  content: FileUploadResponse?.data?.RET_DESC,
                  style: { top: 320 }
              });
        // return;
    };
    // 파일 업로드 처리 End
    //=================================================================

    //=================================================================
    // 파일 삭제 처리 Start
    const [FileDelete] = useFileDeleteMutation();
    const handelFileDelete = async (SaveFileName) => {
        const FileDeleteResponse = await FileDelete({
            File_Key: FileKey,
            Save_FileName: SaveFileName
        });
        if (FileDeleteResponse?.data?.RET_CODE === '0000') {
            setFileContainer(FileDeleteResponse?.data?.RET_DATA);
        } else {
            Modal.error({
                content: '파일 삭제 오류',
                style: { top: 320 },
                onOk() {}
            });
        }
        return;
    };
    // 파일 삭제 처리 End
    //=================================================================

    //=================================================================
    // 파일 업로드 Start
    const handleDrop = (acceptedFiles) => {
        const remainingSlots = 20 - uploadedFiles.length;
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
        setSelectedFile((prevImages) => [...prevImages, ...filesToUpload]);
    };

    const {
        getRootProps: getRootProps,
        getInputProps: getInputProps,
        isDragActive: isDragActive
    } = useDropzone({
        onDrop: handleDrop
    });

    // 이미지 삭제
    const handleImageDelete = (index) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles.splice(index, 1);
        setUploadedFiles(updatedFiles);

        const selectedFiles = [...selectedFile];
        selectedFiles.splice(index, 1);
        setSelectedFile(selectedFiles);
    };
    // 이미지 업로드 End
    //=================================================================

    // 등록일자
    const onChange = (date, dateString) => {
        setItemContainer({ ...itemContainer, InDate: dateString });
    };

    // 파일삭제 확인
    const handel_FileDelete = (SaveFileName) => {
        const confirmDelete = window.confirm('선택한 파일을 삭제하시겠습니까?');
        if (confirmDelete) {
            handelFileDelete(SaveFileName);
        } else {
            console.log('파일 삭제가 취소되었습니다.');
        }
    };
    // 파일삭제 확인

    // 목록 Start
    const Lists = () => {
        navigate('/notice/List', { state: { board: boardProp, flag: flagProp, title: titleProp } });
    };
    // 목록 End

    const SwitchChange = (e) => {
        e === false
            ? setItemContainer({
                  ...itemContainer,
                  State: 1
              })
            : setItemContainer({
                  ...itemContainer,
                  State: 0
              });
    };

    useEffect(() => {
        setBoardProp(location.state.board);
        setFlagProp(location.state.flag);
        setTitleProp(location.state.title);
        setFormProp(location.state.form);
        setFileKey(uuidv4());
        handel_BoardView();
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
                    <Row
                        gutter={[16, 32]}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <Col span={24} style={{ fontSize: '15px' }}>
                            {formProp === 'Write' ? (
                                <DatePicker
                                    placeholder="등록일"
                                    onChange={onChange}
                                    style={{ height: '55px', width: '100%' }}
                                    value={itemContainer?.Date ? dayjs(itemContainer?.Date) : dayjs(new Date())}
                                />
                            ) : (
                                `등록일 : ${new Date(itemContainer?.Date).toLocaleTimeString('ko-KR', DataOptions).substring(0, 12)}`
                            )}
                        </Col>
                    </Row>
                    <Row style={{ padding: '30px 0px' }}>
                        <Col span={24} style={{ fontSize: '15px' }}>
                            <Switch
                                className="custom-switch"
                                checked={itemContainer?.State === 1 ? false : true}
                                checkedChildren={
                                    <span>
                                        {' '}
                                        <CheckOutlined /> 게시물 노출
                                    </span>
                                }
                                unCheckedChildren={
                                    <span>
                                        {' '}
                                        <CloseOutlined /> 게시물 미노출
                                    </span>
                                }
                                name="State"
                                onChange={(e) => SwitchChange(e)}
                                plugins={[colorSyntax]}
                                language="ko-KR"
                            />
                        </Col>
                    </Row>
                    <Row
                        gutter={[16, 32]}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <Col span={24} style={{ fontSize: '18px', fontWeight: '600' }}>
                            <Input
                                size="large"
                                placeholder="제목"
                                prefix={<EditOutlined />}
                                allowClear
                                value={itemContainer?.Subject}
                                style={{ height: '55px' }}
                                onChange={(e) => setItemContainer({ ...itemContainer, Subject: e.target.value })}
                            />
                        </Col>
                        {flagProp === 'Picture' ? (
                            <Col span={24} style={{ fontSize: '15px' }}>
                                <Input
                                    size="large"
                                    placeholder="이수인원"
                                    prefix={<EditOutlined />}
                                    allowClear
                                    value={itemContainer?.Subject}
                                    enterButton="Search"
                                    style={{ height: '55px' }}
                                    onChange={(e) => setItemContainer({ ...itemContainer, Unit: e.target.value })}
                                />
                            </Col>
                        ) : (
                            ''
                        )}
                    </Row>
                    <Row style={{ padding: '30px 0px' }}>
                        <Col span={24} style={{ fontSize: '15px' }}>
                            <Editor
                                ref={editorRef}
                                initialValue={' '}
                                initialEditType="wysiwyg"
                                hideModeSwitch={false}
                                width="100%"
                                height={flagProp === 'Picture' ? '150px' : '450px'}
                                usageStatistics={false}
                                useCommandShortcut={true}
                                name="Contents"
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
                    </Row>
                    <Row
                        gutter={[0, 8]}
                        style={{
                            border: '2px solid #cfcfcf',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '13px 10px'
                        }}
                    >
                        {fileContainer?.map((d, i) => (
                            <>
                                <Col xs={11} lg={14} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                    <span>
                                        <FileDoneOutlined /> {d.Original_FileName}
                                    </span>
                                </Col>
                                <Col xs={13} lg={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Space>
                                        <Tooltip title={<span style={{ fontSize: '13px' }}>다운로드</span>} color={'#f50'} placement="top">
                                            <Button
                                                type="default"
                                                icon={<DownloadOutlined />}
                                                // onClick={() => handel_FileDownLoad(d.Save_FileName)}
                                                onClick={() => handel_FileDownLoad(d.File_Path, d.Save_FileName)}
                                                style={{ height: '30px', width: '45px', backgroundColor: '#efefef', fontSize: '13px' }}
                                            ></Button>
                                        </Tooltip>
                                        {d.File_Ext === 'jpg' || d.File_Ext === 'gif' || d.File_Ext === 'jpge' || d.File_Ext === 'tif' ? (
                                            <Tooltip
                                                title={<span style={{ fontSize: '13px' }}>미리보기</span>}
                                                color={'#108ee9'}
                                                placement="top"
                                            >
                                                <Button
                                                    type="default"
                                                    icon={<EyeOutlined />}
                                                    // onClick={() => handel_FilePreView(d.Save_FileName)}
                                                    onClick={() => handel_FilePreView(d.File_Path)}
                                                    style={{ height: '30px', width: '45px', backgroundColor: '#efefef', fontSize: '13px' }}
                                                ></Button>
                                            </Tooltip>
                                        ) : (
                                            ''
                                        )}
                                        <Tooltip title={<span style={{ fontSize: '13px' }}>삭제</span>} color={'#108ee9'} placement="top">
                                            <Button
                                                type="default"
                                                icon={<DeleteFilled />}
                                                onClick={() => handel_FileDelete(d.Save_FileName)}
                                                style={{
                                                    height: '30px',
                                                    width: '45px',
                                                    backgroundColor: '#fa541c',
                                                    fontSize: '13px',
                                                    color: '#ffffff'
                                                }}
                                            ></Button>
                                        </Tooltip>
                                    </Space>
                                </Col>
                            </>
                        ))}
                    </Row>
                    <Row
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <Col span={24} style={{ fontSize: '15px' }}>
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

                            {uploadedFiles?.length > 0 ? (
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
                                                        onClick={() => handleImageDelete(index)}
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
                    <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Col
                            xs={{
                                span: 12,
                                offset: 1
                            }}
                            lg={{
                                span: 2,
                                offset: 2
                            }}
                        >
                            {formProp === 'Write' ? (
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={(e) => Writes()}
                                    type="primary"
                                    style={{ height: '45px', width: '160px' }}
                                >
                                    등록
                                </Button>
                            ) : (
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={(e) => handel_BoardUpdate()}
                                    type="primary"
                                    style={{ height: '45px', width: '160px' }}
                                >
                                    수정
                                </Button>
                            )}
                        </Col>
                        <Col
                            xs={{
                                span: 8,
                                offset: 1
                            }}
                            lg={{
                                span: 4,
                                offset: 2
                            }}
                        >
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
