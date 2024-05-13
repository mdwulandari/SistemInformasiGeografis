<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Models\User;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function register(Request $request)
    {
        //Validate data
        $data = $request->only('name', 'email', 'password');
        $validator = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        //Request is valid, create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        //User created, return success response
        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $user
        ], Response::HTTP_OK);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        //valid credential
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Something error', 'data' => ['errors' => $validator->messages()]], 200);
        }

        //Request is validated
        //Crean token
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid login credentials.',
                ], 400);
            }
        } catch (JWTException $e) {
            //return $credentials;
            return response()->json([
                'success' => false,
                'message' => 'Could not create token.',
            ], 500);
        }

        //$user = JWTAuth::authenticate("Bearer $token");
        $user = JWTAuth::user()->only('id', 'email', 'name');
        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'message' => 'Login successfully',
            'data' => ['token' => $token, 'user' => $user],
        ]);
    }

    public function logout(Request $request)
    {
        //Request is validated, do logout        
        try {
            JWTAuth::invalidate($request->header()['authorization']);

            return response()->json([
                'success' => true,
                'message' => 'Logout successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function get_user(Request $request)
    {
        $user = JWTAuth::authenticate($request->token);
        return response()->json([
            'success' => true,
            'message' => 'Successfully get user info',
            'data' => ['user' => $user, 'expired' => JWTAuth::getPayload($request->token)->toArray()['exp'] - time() . ' second(s)'],
            //'token' => $request->header()['authorization'],
            //'tokeninfo' => JWTAuth::getPayload($request->token)->toArray(),
            //'now' => time(),
            //'expired' => JWTAuth::getPayload($request->token)->toArray()['exp'] - time() . ' second(s)',
        ], 200);
    }

    public function add_hospitals(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'lat_lng_rs' => 'required|string',
            'nama_rs' => 'required|string',
            'alamat_rs' => 'required|string',
            'id_type_rs' => 'required|exists:tb_type_rs,id_type_rs',
        ]);

        // Jika validasi gagal, kembalikan respons error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Buat rumah sakit baru
        $hospital = new Hospital();
        $hospital->lat_lng_rs = $request->lat_lng_rs;
        $hospital->nama_rs = $request->nama_rs;
        $hospital->alamat_rs = $request->alamat_rs;
        $hospital->id_type_rs = $request->id_type_rs;
        $hospital->save();

        // Berikan respons sukses
        return response()->json([
            'success' => true,
            'message' => 'Hospital added successfully',
            'data' => $hospital,
        ], 201);
    }

    public function get_hospitals()
    {
        // Ambil semua data rumah sakit
        $hospitals = Hospital::all();
    
        // Jika tidak ada rumah sakit yang ditemukan, kembalikan respons kosong
        if ($hospitals->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No hospitals found',
            ], 404);
        }
    
        // Jika ada rumah sakit yang ditemukan, kembalikan respons sukses beserta data rumah sakit
        return response()->json([
            'success' => true,
            'message' => 'Hospitals retrieved successfully',
            'data' => $hospitals,
        ], 200);
    }

    public function get_hospitals_id($id_rs)
    {
        // Temukan rumah sakit berdasarkan ID
        $hospital = Hospital::find($id_rs);
    
        // Jika rumah sakit tidak ditemukan, kembalikan respons error
        if (!$hospital) {
            return response()->json([
                'success' => false,
                'message' => 'Hospital not found',
            ], 404);
        }
    
        // Jika rumah sakit ditemukan, kembalikan respons sukses beserta data rumah sakit
        return response()->json([
            'success' => true,
            'message' => 'Hospital details retrieved successfully',
            'data' => $hospital,
        ], 200);
    }
    
    public function edit_hospitals(Request $request, $id_rs)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'lat_lng_rs' => 'required|string',
            'nama_rs' => 'required|string',
            'alamat_rs' => 'required|string',
            'id_type_rs' => 'required|exists:tb_type_rs,id_type_rs',
        ]);
    
        // Jika validasi gagal, kembalikan respons error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        // Temukan rumah sakit berdasarkan ID
        $hospital = Hospital::findOrFail($id_rs);
    
        // Update data rumah sakit
        $hospital->lat_lng_rs = $request->lat_lng_rs;
        $hospital->nama_rs = $request->nama_rs;
        $hospital->alamat_rs = $request->alamat_rs;
        $hospital->id_type_rs = $request->id_type_rs;
        $hospital->save();
    
        // Berikan respons sukses
        return response()->json([
            'success' => true,
            'message' => 'Hospital updated successfully',
            'data' => $hospital,
        ], 200);
    }

    public function delete_hospitals($id_rs)
    {
        // Temukan rumah sakit berdasarkan ID
        $hospital = Hospital::find($id_rs);
    
        // Jika rumah sakit tidak ditemukan, kembalikan respons error
        if (!$hospital) {
            return response()->json([
                'success' => false,
                'message' => 'Hospital not found',
            ], 404);
        }
    
        // Jika rumah sakit ditemukan, hapus rumah sakit
        $hospital->delete();
    
        // Berikan respons sukses
        return response()->json([
            'success' => true,
            'message' => 'Hospital deleted successfully',
        ], 200);
    }  
}