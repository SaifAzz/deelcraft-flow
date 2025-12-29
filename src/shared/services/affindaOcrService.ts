/**
 * Affinda OCR Service for extracting text and data from passports and IDs
 * Documentation: https://docs.affinda.com/
 * 
 * Setup:
 * 1. Get your API key from the Affinda dashboard
 * 2. Create a workspace in Affinda and note the workspace identifier
 * 3. Add to your .env file:
 *    VITE_AFFINDA_API_KEY=aff_954cbdc849b09bef05589e555141d9d76ff9fa13
 *    VITE_AFFINDA_WORKSPACE_ID=ChcMSEfQ (optional, defaults to ChcMSEfQ)
 * 
 * API Format:
 * curl -X POST https://api.affinda.com/v3/documents \
 *      -H "Authorization: Bearer $AFFINDA_API_KEY" \
 *      -F "file=@sample_invoice.pdf" \
 *      -F "workspace=YOUR_WORKSPACE_IDENTIFIER"
 */

export interface AffindaOcrResult {
  success: boolean;
  data?: {
    fullName?: string;
    dateOfBirth?: string;
    nationality?: string;
    gender?: string;
    placeOfBirth?: string;
    documentType?: string;
    documentNumber?: string;
    issueDate?: string;
    expiryDate?: string;
    issuingAuthority?: string;
    rawText?: string;
    extractedFields?: Record<string, any>;
  };
  error?: string;
}

/**
 * Affinda OCR Service
 * 
 * Note: In production, this should call your backend API which then calls Affinda.
 * Direct API calls from frontend are not recommended for security (API key exposure).
 * 
 * For POC: This service can work with a backend proxy endpoint or mock data.
 */
export const affindaOcrService = {
  /**
   * Extract text and data from a passport or ID document
   * @param file - The file to process (image or PDF)
   * @param documentType - Type of document: 'passport' | 'national_id'
   * @returns Promise with extracted OCR data
   */
  async extractDocumentData(
    file: File,
    documentType: 'passport' | 'national_id' = 'passport'
  ): Promise<AffindaOcrResult> {
    try {
      // Validate file
      if (!file) {
        return {
          success: false,
          error: 'No file provided',
        };
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        return {
          success: false,
          error: 'Invalid file type. Please upload a JPEG, PNG, or PDF file.',
        };
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        return {
          success: false,
          error: 'File size exceeds 10MB limit.',
        };
      }

      // In production, this should call your backend API endpoint
      // Example: const response = await fetch('/api/ocr/extract', { ... })
      // For now, we'll use a mock implementation that simulates the API call
      
      const apiKey = import.meta.env.VITE_AFFINDA_API_KEY;
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

      console.log('🔍 Checking Affinda configuration:', {
        hasApiKey: !!apiKey,
        apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'NOT SET',
        hasBackendUrl: !!backendUrl,
        backendUrl: backendUrl || 'NOT SET',
      });

      // If backend URL is configured, use it (recommended for production)
      if (backendUrl) {
        console.log('✅ Using backend API for document extraction');
        return await this.extractViaBackend(file, documentType, backendUrl);
      }

      // If API key is configured, call Affinda directly (not recommended for production)
      if (apiKey) {
        console.log('✅ Using Affinda API directly for document extraction');
        console.log('📤 Sending document to Affinda workspace:', import.meta.env.VITE_AFFINDA_WORKSPACE_ID || 'ChcMSEfQ');
        return await this.extractViaAffindaDirect(file, documentType, apiKey);
      }

      // For POC/demo: Return mock data
      console.error('❌ No Affinda API key or backend URL configured. Using MOCK DATA.');
      console.error('⚠️  To enable real document extraction, add to your .env file:');
      console.error('   VITE_AFFINDA_API_KEY=aff_954cbdc849b09bef05589e555141d9d76ff9fa13');
      console.error('   VITE_AFFINDA_WORKSPACE_ID=ChcMSEfQ');
      console.error('   Then restart your dev server!');
      return await this.extractMockData(file, documentType);
    } catch (error) {
      console.error('Affinda OCR extraction error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to extract document data',
      };
    }
  },

  /**
   * Extract via backend API (recommended approach)
   */
  async extractViaBackend(
    file: File,
    documentType: 'passport' | 'national_id',
    backendUrl: string
  ): Promise<AffindaOcrResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    try {
      const response = await fetch(`${backendUrl}/api/ocr/extract`, {
        method: 'POST',
        body: formData,
        // Note: Don't set Content-Type header, browser will set it with boundary
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Backend API error',
      };
    }
  },

  /**
   * Extract via Affinda API directly (not recommended for production - exposes API key)
   * This is for development/testing only
   */
  async extractViaAffindaDirect(
    file: File,
    documentType: 'passport' | 'national_id',
    apiKey: string
  ): Promise<AffindaOcrResult> {
    // Determine Affinda document type
    const affindaDocumentType = documentType === 'passport' ? 'passport' : 'id_document';

    // Get workspace ID from environment or use default
    const workspaceId = import.meta.env.VITE_AFFINDA_WORKSPACE_ID || 'ChcMSEfQ';

    try {
      // Step 1: Create a document in Affinda using multipart/form-data
      // Format matches: curl -X POST https://api.affinda.com/v3/documents \
      //                  -H "Authorization: Bearer $AFFINDA_API_KEY" \
      //                  -F "file=@sample_invoice.pdf" \
      //                  -F "workspace=YOUR_WORKSPACE_IDENTIFIER"
      // Note: documentType is omitted - Affinda will auto-detect the document type
      // If you need to specify a document type, you must first create it in your organization
      // and use its identifier (not a plain string like "passport")
      const formData = new FormData();
      formData.append('file', file);
      formData.append('workspace', workspaceId);
      // Note: wait=true can cause issues with some API responses
      // We'll poll for results instead for more reliable handling
      // formData.append('wait', 'true');

      console.log('Uploading document to Affinda:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        documentType: affindaDocumentType + ' (auto-detect)',
        workspaceId: workspaceId,
        apiKeyPrefix: apiKey.substring(0, 10) + '...', // Log partial key for debugging
        note: 'Document type will be auto-detected by Affinda',
      });

      const createResponse = await fetch('https://api.affinda.com/v3/documents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          // Don't set Content-Type header - browser will set it with boundary for FormData
        },
        body: formData,
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || createResponse.statusText };
        }
        console.error('Affinda API error:', {
          status: createResponse.status,
          statusText: createResponse.statusText,
          error: errorData,
        });
        throw new Error(errorData.message || errorData.error || `Failed to create document: ${createResponse.statusText}`);
      }

      const createData = await createResponse.json();
      console.log('📦 Upload response:', JSON.stringify(createData, null, 2));
      
      // Check if response already contains processed data
      // Response structure: { data: {...}, meta: {...}, error, warnings, extractor }
      const status = createData.data?.status || createData.status;
      const hasExtractedData = 
        createData.data?.data?.fullName ||
        createData.data?.data?.name ||
        createData.data?.data?.documentNumber ||
        createData.data?.data?.passportNumber ||
        createData.data?.fullName ||
        createData.data?.name;
      
      // If document is ready and has extracted data, parse it directly
      if ((status === 'ready' || status === 'success' || status === 'completed' || status === 'valid') && hasExtractedData) {
        console.log('✅ Document already processed in upload response');
        return {
          success: true,
          data: this.parseAffindaResponse(createData, documentType),
        };
      }
      
      // Extract document identifier from upload response
      // The identifier is typically in data.identifier or data.id
      const documentIdentifier = 
        createData.data?.identifier ||
        createData.data?.id ||
        createData.identifier || 
        createData.id ||
        createData.meta?.identifier ||
        createData.meta?.id;
      
      // Log the data structure for debugging
      if (createData.data) {
        console.log('📋 Data object keys:', Object.keys(createData.data));
        if (createData.data.data) {
          console.log('📋 Data.data object keys:', Object.keys(createData.data.data));
        }
      }
      if (createData.meta) {
        console.log('📋 Meta object keys:', Object.keys(createData.meta));
      }
      
      if (!documentIdentifier) {
        // If we have data but no identifier, try to parse it anyway
        if (createData.data) {
          console.log('⚠️ No identifier found, but data exists. Attempting to parse directly...');
          return {
            success: true,
            data: this.parseAffindaResponse(createData, documentType),
          };
        }
        
        console.error('❌ No document identifier found. Full response structure:', {
          topLevelKeys: Object.keys(createData),
          dataKeys: createData.data ? Object.keys(createData.data) : 'no data',
          metaKeys: createData.meta ? Object.keys(createData.meta) : 'no meta',
          status: status,
        });
        throw new Error(`Failed to get document identifier from upload response. Response keys: ${JSON.stringify(Object.keys(createData))}`);
      }
      
      console.log('📄 Document identifier:', documentIdentifier);
      
      // Now fetch the document details using GET /v3/documents/{identifier}
      // This is the correct way to get document data according to Affinda API
      return await this.fetchDocumentDetails(documentIdentifier, apiKey, documentType);
    } catch (error) {
      console.error('Affinda OCR extraction error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : typeof error === 'string' 
          ? error 
          : 'Affinda API error';
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  /**
   * Fetch document details using GET /v3/documents/{identifier}
   * Polls until document is ready or timeout
   */
  async fetchDocumentDetails(
    identifier: string,
    apiKey: string,
    documentType: 'passport' | 'national_id'
  ): Promise<AffindaOcrResult> {
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds max wait (increased from 30)
    const pollInterval = 2000; // Poll every 2 seconds instead of 1
    
    while (attempts < maxAttempts) {
      // Wait before polling (document needs time to process)
      if (attempts > 0) {
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      } else {
        // Wait 3 seconds before first poll to give document time to start processing
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      console.log(`📥 Fetching document (attempt ${attempts + 1}/${maxAttempts}):`, identifier);
      
      // GET /v3/documents/{identifier}
      const getResponse = await fetch(`https://api.affinda.com/v3/documents/${identifier}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!getResponse.ok) {
        const errorText = await getResponse.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || getResponse.statusText };
        }
        
        console.error('Failed to fetch document:', {
          status: getResponse.status,
          statusText: getResponse.statusText,
          error: errorData,
        });
        
        // If 404, document might not exist yet - continue polling for a bit
        if (getResponse.status === 404 && attempts < 10) {
          console.log('Document not found yet (404), continuing to poll...');
          attempts++;
          continue;
        }
        
        throw new Error(errorData.message || errorData.error || `Failed to fetch document: ${getResponse.statusText}`);
      }

      const documentData = await getResponse.json();
      
      // Log full response structure on first attempt for debugging
      if (attempts === 0) {
        console.log('📦 Full document response structure:', JSON.stringify(documentData, null, 2));
      }
      
      // Try to find status in multiple locations
      const status = 
        documentData.status || 
        documentData.data?.status ||
        documentData.meta?.status ||
        documentData.extractor?.status;
      
      console.log(`📋 Document status:`, status || 'unknown', `(attempt ${attempts + 1})`);
      
      // Check if document has extracted data (might be ready even if status is different)
      const hasExtractedData = 
        documentData.data?.data?.fullName ||
        documentData.data?.data?.name ||
        documentData.data?.data?.documentNumber ||
        documentData.data?.data?.passportNumber ||
        documentData.data?.fullName ||
        documentData.data?.name ||
        documentData.fullName ||
        documentData.name;
      
      // Check if document is ready - check multiple status values
      const isReady = 
        status === 'ready' || 
        status === 'success' || 
        status === 'completed' || 
        status === 'valid' ||
        status === 'processed' ||
        (hasExtractedData && status !== 'error' && status !== 'failed' && status !== 'processing');
      
      if (isReady || hasExtractedData) {
        console.log('✅ Document processing completed! Status:', status);
        console.log('📦 Document data keys:', documentData.data ? Object.keys(documentData.data) : Object.keys(documentData));
        return {
          success: true,
          data: this.parseAffindaResponse(documentData, documentType),
        };
      }

      // Check if document has an error
      if (status === 'error' || status === 'failed' || status === 'rejected') {
        const errorMsg = documentData.error || documentData.message || documentData.data?.error || 'Document processing failed';
        console.error('❌ Document processing error:', {
          status,
          error: errorMsg,
          fullResponse: documentData,
        });
        throw new Error(errorMsg);
      }

      // Document is still processing
      console.log(`⏳ Document still processing (status: ${status || 'unknown'}), waiting ${pollInterval/1000}s...`);
      attempts++;
    }

    // On timeout, log the last known status
    console.error('⏱️ Document processing timeout after 60 seconds');
    throw new Error('Document processing timeout after 60 seconds. The document may still be processing in Affinda. Please check your Affinda dashboard.');
  },

  /**
   * Mock data extraction for POC/demo
   */
  async extractMockData(
    file: File,
    documentType: 'passport' | 'national_id'
  ): Promise<AffindaOcrResult> {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock extracted data
    const mockData = documentType === 'passport' 
      ? {
          fullName: 'John Doe',
          dateOfBirth: '1990-01-15',
          nationality: 'Canadian',
          gender: 'Male',
          placeOfBirth: 'Toronto, Canada',
          documentType: 'Passport',
          documentNumber: 'AB123456',
          issueDate: '2020-01-01',
          expiryDate: '2030-01-01',
          issuingAuthority: 'Government of Canada',
          rawText: 'PASSPORT\nCANADA\nCAN\nDOE\nJOHN\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<\nAB1234567CAN9001151M3001010<<<<<<<<<<<<<<<',
          extractedFields: {
            mrz: 'P<CANDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<\nAB1234567CAN9001151M3001010<<<<<<<<<<<<<<<',
          },
        }
      : {
          fullName: 'Jane Smith',
          dateOfBirth: '1985-05-20',
          nationality: 'Canadian',
          gender: 'Female',
          placeOfBirth: 'Vancouver, Canada',
          documentType: 'National ID',
          documentNumber: 'CD789012',
          issueDate: '2021-06-01',
          expiryDate: '2031-06-01',
          issuingAuthority: 'Provincial Government',
          rawText: 'NATIONAL ID\nCANADA\nSMITH\nJANE\nCD789012\nIssued: 2021-06-01',
          extractedFields: {},
        };

    return {
      success: true,
      data: mockData,
    };
  },

  /**
   * Convert file to base64 string
   */
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]; // Remove data:image/png;base64, prefix
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  /**
   * Parse Affinda API response into our standard format
   */
  parseAffindaResponse(
    affindaData: any,
    documentType: 'passport' | 'national_id'
  ): AffindaOcrResult['data'] {
    // Affinda response structure varies by document type
    // Response can be: { data: {...}, meta: {...} } or { data: { data: {...} } }
    // Try to find the actual document data in nested structures
    let data = affindaData;
    
    // If response has a data property, use it
    if (affindaData.data) {
      data = affindaData.data;
      // If data.data exists (nested), that's likely the actual document data
      if (affindaData.data.data) {
        data = affindaData.data.data;
      }
    }
    
    console.log('🔍 Parsing Affinda response. Data structure:', {
      hasData: !!affindaData.data,
      hasNestedData: !!affindaData.data?.data,
      dataKeys: data ? Object.keys(data) : 'no data',
    });

    return {
      fullName: data.fullName || data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
      dateOfBirth: data.dateOfBirth || data.dob,
      nationality: data.nationality || data.country,
      gender: data.gender || data.sex,
      placeOfBirth: data.placeOfBirth || data.birthPlace,
      documentType: data.documentType || (documentType === 'passport' ? 'Passport' : 'National ID'),
      documentNumber: data.documentNumber || data.passportNumber || data.idNumber,
      issueDate: data.issueDate || data.dateOfIssue,
      expiryDate: data.expiryDate || data.dateOfExpiry,
      issuingAuthority: data.issuingAuthority || data.issuer,
      rawText: data.rawText || data.text || '',
      extractedFields: data,
    };
  },
};

