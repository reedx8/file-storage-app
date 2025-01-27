'use client';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';
// import { FunctionReference } from 'convex/server';
import CreateFileModal from '@/components/createFileModal';
import { FileCard } from '@/components/fileCard';
import imageFolder from '../../public/imagefolder.svg';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
<Loader2 className='animate-spin h-5 w-5 text-white' />

export default function Home() {
    // const createFile = useMutation(api.files.createFile);
    const organization = useOrganization();
    const user = useUser();

    let orgId: string | undefined = undefined;

    // if user is logged in, get orgId from user or their organization
    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id;
    }

    const getFiles = useQuery(api.files.getFiles, orgId ? { orgId } : 'skip');
    // const getFiles: any = [];

    return (
        <main className='mx-4 mt-4'>
            <div>
                {/* { getFiles === undefined && <Loader2 className='animate-spin h-32 w-32 text-black' />} */}
                { getFiles?.length !== 0 && (
                    <div className='flex flex-col justify-between'>
                        <div className='flex justify-between'>
                            <h1 className='text-4xl font-bold'>Your Files</h1>
                            <div>{CreateFileModal(orgId)}</div>
                            {/* <div><CreateFileModal orgId={orgId} /></div> */}
                        </div>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4'>
                            {getFiles?.map((file) => {
                                return <FileCard file={file} key={file._id} />;
                            })}
                        </div>
                    </div>
                )}
                { getFiles?.length === 0 && (
                    <div>
                        {/* <div className="flex justify-end">{CreateFileModal(orgId)}</div> */}
                        <div className='flex flex-col justify-center align-middle mt-12'>
                            <div className='flex flex-col items-center justify-center gap-4'>
                                <Image
                                    src={imageFolder}
                                    alt='image folder'
                                    width={300}
                                    height={300}
                                />
                                <p className='text-center text-gray-500 text-xl'>
                                    No files found. Upload a file to get started.
                                </p>
                                <div>{CreateFileModal(orgId)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
